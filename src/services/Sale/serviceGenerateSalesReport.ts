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
  createdAt?: string | Date
}

type SaleDetailRow = {
  saleId: string
  quantity: number
  mount: number
  product?: { name?: string; price?: number | null }
}

const serviceGenerateSalesReport = async ({
  storeId,
  from,
  to,
}: SalesReportRangeOptions) => {
  const store = await Store.findByPk(storeId)
  if (!store) return { error: 'Tienda no encontrada' }

  // Normalizamos rango
  const start = startOfDay(from)
  const end = endOfDay(to)

  // 1) Ventas de la tienda (tu servicio no filtra por fecha => filtramos en memoria)
  const allSales = (await serviceGetSales(storeId)) as unknown as SaleRow[]

  // 2) Filtrar por fecha usando income_date (fallback: createdAt)
  const salesInRange = allSales.filter((s) => {
    const raw = s.income_date ?? s.createdAt
    if (!raw) return false
    const d = new Date(raw as any)
    return d >= start && d <= end
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
  const returnsInRange = await Return.findAll({
    where: {
      createdAt: { [Op.between]: [start, end] }, // si usas otro campo de fecha en returns, cámbialo aquí
    },
    include: [
      { model: Product, as: 'product', attributes: ['name', 'price'] },
      { model: sale, as: 'sale', attributes: [], where: { store_id: storeId } },
    ],
  })

  // usar el total guardado en returns (price ya es monto total)
  function num(x: any) {
    const n = Number(x)
    return Number.isFinite(n) ? n : 0
  }

  type LossRow = { product: string; total: number }
  const lossMap = new Map<string, number>()

  for (const r of returnsInRange as any[]) {
    const name = r.product?.name ?? 'Producto'
    const lineTotal = num(r.price ?? r.mount ?? r.total ?? 0)
    lossMap.set(name, (lossMap.get(name) ?? 0) + lineTotal)
  }

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

// ---- helpers ----
function startOfDay(d: string | Date) {
  const x = new Date(d)
  return new Date(x.getFullYear(), x.getMonth(), x.getDate(), 0, 0, 0)
}
function endOfDay(d: string | Date) {
  const x = new Date(d)
  return new Date(x.getFullYear(), x.getMonth(), x.getDate(), 23, 59, 59)
}
function toYMD(d: Date) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${dd}`
}
