import Store from '@models/store'
import Product from '@models/product'
import Return from '@models/returns'
import sale from '@models/sale'
import serviceGetSales from '@services/Sale/serviceGetSales'
import serviceGetSaleDetails from '@services/sale_detail/serviceGetSaleDetails'
import { Op } from 'sequelize'

interface SalesReportRangeOptions {
  storeId: string
  from: string | Date // fecha de inicio (YYYY-MM-DD o Date)
  to: string | Date // fecha de fin (YYYY-MM-DD o Date)
}

type SaleRow = {
  id: string
  store_id: string
  income_date?: string | Date | null
  createdAt?: string | Date | null
}

type SaleDetailRow = {
  saleId: string
  quantity: number
  mount: number
  product?: { name?: string; price?: number | null } | null
}

type ReturnRow = {
  price?: number | null // total de la devolución (ya multiplicado)
  mount?: number | null // por si tu esquema usa otro nombre
  total?: number | null
  quantity?: number | null
  product?: { name?: string | null } | null
  // sale?: {}  // no usamos campos de sale en la salida
}

const serviceGenerateSalesReport = async ({
  storeId,
  from,
  to,
}: SalesReportRangeOptions) => {
  const store = await Store.findByPk(storeId)
  if (!store) return { error: 'Tienda no encontrada' }

  // Normalizamos rango (parseo LOCAL, sin desfaces por zona horaria)
  const start = startOfDay(from)
  const end = endOfDay(to)

  // 1) Ventas de la tienda (tu servicio no filtra por fecha => filtramos en memoria)
  const allSales = (await serviceGetSales(storeId)) as unknown as SaleRow[]

  // 2) Filtrar por fecha usando income_date (fallback: createdAt)
  const salesInRange = allSales.filter((s) => {
    const raw: string | Date | null | undefined = s.income_date ?? s.createdAt
    const d = toDate(raw)
    return d !== null && d >= start && d <= end
  })

  // 3) Traer todos los detalles y filtrar por las ventas del rango
  const allDetails =
    (await serviceGetSaleDetails()) as unknown as SaleDetailRow[]
  const saleIdSet = new Set(salesInRange.map((s) => s.id))
  const detailsInRange = allDetails.filter((d) => saleIdSet.has(d.saleId))

  // ====== Helpers ======
  const money = (n: number) => `S/${n.toFixed(2)}`
  const repeat = (ch: string, n: number) => ch.repeat(Math.max(n, 0))
  const toUnit = (qty: number, total: number, fallback?: number | null) =>
    qty > 0 ? total / qty : (fallback ?? 0)

  // ====== Ventas ======
  type Row = { product: string; qty: number; unit: number; total: number }
  const rows: Row[] = []
  let totalVentas = 0

  for (const d of detailsInRange) {
    const name = d.product?.name ?? 'Producto'
    const qty = Number(d.quantity) || 0
    const lineTotal = Number(d.mount) || 0
    const unit =
      d.product?.price != null
        ? Number(d.product.price)
        : toUnit(qty, lineTotal)
    rows.push({ product: name, qty, unit, total: lineTotal })
    totalVentas += lineTotal
  }

  // Anchos dinámicos ventas
  const minProd = 18
  const prodWidth = Math.max(
    minProd,
    ...rows.map((r) => r.product.length),
    'Producto'.length,
  )
  const qtyWidth = Math.max(7, 'Cantidad'.length)
  const unitWidth = Math.max(10, 'P.U.'.length)
  const totalWidth = Math.max(12, 'Total'.length)
  const sep = `+${repeat('-', prodWidth + 2)}+${repeat('-', qtyWidth + 2)}+${repeat('-', unitWidth + 2)}+${repeat('-', totalWidth + 2)}+`

  // ====== Pérdidas (returns) — por fecha del propio return + tienda por JOIN a sale
  const returnsInRange = (await Return.findAll({
    where: {
      createdAt: { [Op.between]: [start, end] }, // cambia a income_date si tu modelo de returns lo tiene
    },
    include: [
      { model: Product, as: 'product', attributes: ['name', 'price'] },
      { model: sale, as: 'sale', attributes: [], where: { store_id: storeId } },
    ],
  })) as unknown as ReturnRow[]

  // usar el total guardado en returns (price ya es monto total)
  const lossMap = new Map<string, number>()
  for (const r of returnsInRange) {
    const name = (r.product?.name ?? 'Producto') || 'Producto'
    const lineTotal = num(r.price ?? r.mount ?? r.total ?? 0)
    lossMap.set(name, (lossMap.get(name) ?? 0) + lineTotal)
  }

  type LossRow = { product: string; total: number }
  const losses: LossRow[] = [...lossMap.entries()].map(([product, total]) => ({
    product,
    total,
  }))
  const totalPerdidas = losses.reduce((acc, l) => acc + l.total, 0)

  const lossProdW = Math.max(
    18,
    ...losses.map((r) => r.product.length),
    'Producto'.length,
  )
  const lossTotalW = Math.max(12, 'Total'.length)
  const lossSep = `+${repeat('-', lossProdW + 2)}+${repeat('-', lossTotalW + 2)}+`

  // ====== Render del reporte ======
  let report = ''
  report += `========================================\n`
  report += `Tienda: ${store.store_name}\n`
  report += `Desde: ${start.toLocaleDateString()}  Hasta: ${end.toLocaleDateString()}\n`
  report += `========================================\n\n`

  // Ventas
  report += `Ventas:\n`
  if (rows.length === 0) {
    report += `— sin ventas registradas —\n\n`
  } else {
    report += `${sep}\n`
    report += `| ${'Producto'.padEnd(prodWidth)} | ${'Cantidad'.padStart(qtyWidth)} | ${'P.U.'.padStart(unitWidth)} | ${'Total'.padStart(totalWidth)} |\n`
    report += `${sep}\n`
    for (const r of rows) {
      report += `| ${r.product.padEnd(prodWidth)} | ${String(r.qty).padStart(qtyWidth)} | ${money(r.unit).padStart(unitWidth)} | ${money(r.total).padStart(totalWidth)} |\n`
    }
    report += `${sep}\n\n`
  }

  // Pérdidas
  report += `Pérdidas:\n`
  if (losses.length === 0) {
    report += `— sin pérdidas registradas —\n`
  } else {
    report += `${lossSep}\n`
    report += `| ${'Producto'.padEnd(lossProdW)} | ${'Total'.padStart(lossTotalW)} |\n`
    report += `${lossSep}\n`
    for (const l of losses) {
      report += `| ${l.product.padEnd(lossProdW)} | ${money(l.total).padStart(lossTotalW)} |\n`
    }
    report += `${lossSep}\n`
  }

  // Totales
  report += `\n========================================\n`
  report += `Total ventas:   ${money(totalVentas)}\n`
  report += `Total pérdidas: ${money(totalPerdidas)}\n`
  report += `Total general:  ${money(totalVentas - totalPerdidas)}\n`
  report += `========================================\n`

  return {
    success: true,
    message: 'Reporte de ventas generado',
    data: {
      report_text: report,
      date_range: { from: toYMD(start), to: toYMD(end) },
      totals: {
        sales: totalVentas,
        losses: totalPerdidas,
        net: totalVentas - totalPerdidas,
        currency: 'PEN',
      },
      counts: {
        sales: salesInRange.length,
        lines: rows.length,
        loss_lines: losses.length,
      },
      losses,
    },
    report,
  }
}

export default serviceGenerateSalesReport

// ---------- helpers (sin any y con parseo LOCAL) ----------
function parseLocalDate(input: string | Date): Date {
  if (input instanceof Date) {
    return new Date(input.getFullYear(), input.getMonth(), input.getDate())
  }
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(input)
  if (m) {
    const y = Number(m[1])
    const mo = Number(m[2]) - 1
    const d = Number(m[3])
    return new Date(y, mo, d)
  }
  // Fallback: dejar que JS parsee y luego normalizar a local
  const x = new Date(input)
  return new Date(x.getFullYear(), x.getMonth(), x.getDate())
}

function startOfDay(d: string | Date): Date {
  const x = parseLocalDate(d)
  return new Date(x.getFullYear(), x.getMonth(), x.getDate(), 0, 0, 0, 0)
}

function endOfDay(d: string | Date): Date {
  const x = parseLocalDate(d)
  return new Date(x.getFullYear(), x.getMonth(), x.getDate(), 23, 59, 59, 999)
}

function toYMD(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${dd}`
}

function toDate(raw: string | Date | null | undefined): Date | null {
  if (!raw) return null
  return raw instanceof Date ? raw : new Date(raw)
}

function num(x: unknown): number {
  const n = typeof x === 'string' || typeof x === 'number' ? Number(x) : NaN
  return Number.isFinite(n) ? n : 0
}
