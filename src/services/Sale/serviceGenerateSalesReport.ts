import sale from '@models/sale'
import saleDetail from '@models/saleDetail'
import Product from '@models/product'
import Store from '@models/store'
import { Op } from 'sequelize'

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
  // Obtener la tienda
  const store = await Store.findByPk(storeId)
  if (!store) return { error: 'Tienda no encontrada' }

  // Rango de fechas para el día seleccionado
  const startDate = new Date(year, month - 1, day, 0, 0, 0)
  const endDate = new Date(year, month - 1, day, 23, 59, 59)

  // Obtener ventas del día para la tienda
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

  // Simulación de pérdidas
  const simulatedReturns = [
    { product: 'Pan', total: 5 },
    { product: 'Vino', total: 15 },
  ]

  // reporte
  let report = ''
  report += `========================================\n`
  report += `Tienda: ${store.store_name}\n`
  report += `Fecha: ${startDate.toLocaleDateString()}\n`
  report += `========================================\n\n`
  report += `Ventas:\n`
  report += `Producto        | Cantidad | Total\n`

  let totalVentas = 0
  for (const s of sales as unknown as SaleWithDetails[]) {
    for (const d of s.saleDetails) {
      const nombre = d.product.name.padEnd(15)
      const cantidad = d.quantity.toString().padStart(8)
      const total = `S/${d.mount}`.padStart(8)
      report += `${nombre} | ${cantidad} | ${total}\n`
      totalVentas += d.mount
    }
  }

  report += `----------------------------------------\n\n`
  report += `Perdidas:\n`
  report += `Producto        | Total\n`

  let totalPerdidas = 0
  for (const r of simulatedReturns) {
    const nombre = r.product.padEnd(15)
    const total = `S/${r.total}`.padStart(8)
    report += `${nombre} | ${total}\n`
    totalPerdidas += r.total
  }

  report += `\n========================================\n`
  report += `Total ventas:   S/${totalVentas}\n`
  report += `Total perdidas: S/${totalPerdidas}\n`
  report += `Total general:  S/${totalVentas - totalPerdidas}\n`
  report += `========================================\n`

  return { report }
}

export default serviceGenerateSalesReport
