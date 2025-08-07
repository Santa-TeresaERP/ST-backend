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
      createdAt: {
        [Op.between]: [startDate, endDate],
      },
    },
    include: [
      {
        model: saleDetail,
        as: 'saleDetails',
        include: [
          {
            model: Product,
            as: 'product',
          },
        ],
      },
    ],
  })

  const simulatedReturns = [
    { product: 'Pan', total: 5 },
    { product: 'Vino', total: 15 },
  ]

  const doc = new PDFDocument({ margin: 50 })
  const stream = new PassThrough()
  doc.pipe(stream)

  // Cabecera
  doc.fontSize(20).text(`Reporte de Ventas`, { align: 'center' })
  doc.moveDown()
  doc.fontSize(12).text(`Tienda: ${store.store_name}`)
  doc.text(`Fecha: ${startDate.toLocaleDateString()}`)
  doc.moveDown()

  // Ventas
  doc.fontSize(14).text(`Ventas:`, { underline: true })
  doc.moveDown(0.5)
  doc.fontSize(12).text(`Producto        | Cantidad | Total`)
  doc.moveTo(doc.x, doc.y).lineTo(500, doc.y).stroke()

  let totalVentas = 0
  for (const s of sales as unknown as SaleWithDetails[]) {
    for (const d of s.saleDetails) {
      const nombre = d.product.name.padEnd(15)
      const cantidad = d.quantity.toString().padStart(8)
      const total = `S/${d.mount}`.padStart(8)
      doc.text(`${nombre} | ${cantidad} | ${total}`)
      totalVentas += d.mount
    }
  }

  doc.moveDown()

  // Perdidas
  doc.fontSize(14).text(`Pérdidas:`, { underline: true })
  doc.moveDown(0.5)
  doc.fontSize(12).text(`Producto        | Total`)
  doc.moveTo(doc.x, doc.y).lineTo(500, doc.y).stroke()

  let totalPerdidas = 0
  for (const r of simulatedReturns) {
    const nombre = r.product.padEnd(15)
    const total = `S/${r.total}`.padStart(8)
    doc.text(`${nombre} | ${total}`)
    totalPerdidas += r.total
  }

  doc.moveDown()

  // Totales
  doc.fontSize(12).text(`Total ventas:   S/${totalVentas}`)
  doc.text(`Total pérdidas: S/${totalPerdidas}`)
  doc.text(`Total general:  S/${totalVentas - totalPerdidas}`)

  doc.end()

  return {
    stream,
    filename: `reporte-${store.store_name}-${day}-${month}-${year}.pdf`,
  }
}

export default serviceGenerateSalesReport
