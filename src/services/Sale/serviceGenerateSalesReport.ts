import sale from '@models/sale'
import saleDetail from '@models/saleDetail'
import Product from '@models/product'
import Store from '@models/store'
import { Op } from 'sequelize'
import PDFDocument from 'pdfkit'
import { PassThrough } from 'stream'

interface SalesReportOptions {
  storeId: string
  day: number
  month: number
  year: number
}

interface SaleDetail {
  product: { name: string }
  quantity: number
  mount: number
}

interface SaleWithDetails {
  saleDetails: SaleDetail[]
}

const serviceGenerateSalesReport = async ({
  storeId,
  day,
  month,
  year,
}: SalesReportOptions) => {
  const store = await Store.findByPk(storeId)
  if (!store) return { error: 'Tienda no encontrada' }

  const startDate = new Date(year, month - 1, day, 0, 0, 0)
  const endDate = new Date(year, month - 1, day, 23, 59, 59)

  const sales = await sale.findAll({
    where: {
      store_id: storeId,
      createdAt: { [Op.between]: [startDate, endDate] },
    },
    include: [
      {
        model: saleDetail,
        as: 'saleDetails',
        include: [{ model: Product, as: 'product' }],
      },
    ],
  })

  // Pérdidas simuladas
  const simulatedReturns = [
    { product: 'Pan', total: 5 },
    { product: 'Vino', total: 15 },
  ]

  // ====== Helpers de formato (solo diseño) ======
  const money = (n: number) => `S/${n.toFixed(2)}`
  const repeat = (ch: string, n: number) => ch.repeat(Math.max(n, 0))
  const toUnit = (qty: number, total: number) => (qty > 0 ? total / qty : 0)

  // Construir filas de ventas (producto, cant, p.u., total)
  type Row = { product: string; qty: number; unit: number; total: number }
  const rows: Row[] = []
  let totalVentas = 0
  for (const s of sales as unknown as SaleWithDetails[]) {
    for (const d of s.saleDetails) {
      const unit = toUnit(d.quantity, d.mount)
      rows.push({
        product: d.product?.name ?? 'Producto',
        qty: d.quantity,
        unit,
        total: d.mount,
      })
      totalVentas += d.mount
    }
  }

  // Anchos dinámicos (mejor alineación en monospace)
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

  // Cabecera
  let report = ''
  report += `========================================\n`
  report += `Tienda: ${store.store_name}\n`
  report += `Fecha: ${startDate.toLocaleDateString()}\n`
  report += `========================================\n\n`

  // Tabla de ventas
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
  const lossProdW = Math.max(
    18,
    ...simulatedReturns.map((r) => r.product.length),
    'Producto'.length,
  )
  const lossTotalW = Math.max(12, 'Total'.length)
  const lossSep = `+${repeat('-', lossProdW + 2)}+${repeat('-', lossTotalW + 2)}+`

  let totalPerdidas = 0
  report += `${lossSep}\n`
  report += `| ${'Producto'.padEnd(lossProdW)} | ${'Total'.padStart(lossTotalW)} |\n`
  report += `${lossSep}\n`
  for (const r of simulatedReturns) {
    totalPerdidas += r.total
    report += `| ${r.product.padEnd(lossProdW)} | ${money(r.total).padStart(lossTotalW)} |\n`
  }
  report += `${lossSep}\n`

  // Totales
  report += `\n========================================\n`
  report += `Total ventas:   ${money(totalVentas)}\n`
  report += `Total pérdidas: ${money(totalPerdidas)}\n`
  report += `Total general:  ${money(totalVentas - totalPerdidas)}\n`
  report += `========================================\n`

  // Salida conservando compatibilidad
  return {
    success: true,
    message: 'Reporte de ventas generado',
    data: {
      report_text: report,
      date: startDate.toLocaleDateString(),
    },
    report,
  }
}

export default serviceGenerateSalesReport
