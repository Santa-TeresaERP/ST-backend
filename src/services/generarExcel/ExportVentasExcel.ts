import ExcelJS from 'exceljs'
import { getDataDeVentas } from './DataDepVentas'

export const exportVentasExcel = async (
  startDate: string,
  endDate: string,
): Promise<Buffer> => {
  try {
    // 1. Llamar al service
    const result = await getDataDeVentas(startDate, endDate)
    if (!result.success || !result.data) {
      throw new Error(result.message || 'No se encontraron datos para exportar')
    }

    const { buysResources, productions, losts, sales, returns } = result.data

    // 2. Crear Excel
    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('Departamento de Ventas')

    // Encabezados
    worksheet.addRow([`${startDate} ----> ${endDate}`])
    worksheet.addRow([])
    worksheet.addRow(['modulo', 'objeto', 'tipo', 'gasto', 'ganancia'])

    let totalGasto = 0
    let totalGanancia = 0

    // 3. buysResources → inventario
    ;(buysResources as any[]).forEach((buy) => {
      const gasto = Number(buy.total_cost || 0)
      totalGasto += gasto
      worksheet.addRow([
        'inventario',
        buy.resource?.name || '', // 👈 minúscula
        'recurso',
        `s/${gasto}`,
        '',
      ])
    })

    // 4. productions
    ;(productions as any[]).forEach((prod) => {
      worksheet.addRow([
        'produccion',
        prod.Product?.name || '', // 👈 mayúscula
        'producto',
        `s/${50}`,
        '',
      ])
    })

    // 5. losts
    ;(losts as any[]).forEach((lost) => {
      const gasto = Number(lost.quantity || 0)
      totalGasto += gasto
      worksheet.addRow([
        'produccion',
        lost.production?.Product?.name || '', // 👈 ahora correcto
        'perdida',
        `s/${gasto}`,
        '',
      ])
    })

    // 6. sales
    ;(sales as any[]).forEach((sale) => {
      sale.saleDetails?.forEach((detail: any) => {
        const ganancia = Number(detail.mount || 0)
        totalGanancia += ganancia
        worksheet.addRow([
          'ventas',
          detail.product?.name || '', // 👈 producto del detalle
          'venta',
          '',
          `s/${ganancia}`,
        ])
      })
    })

    // 7. returns
    ;(returns as any[]).forEach((ret) => {
      const gasto = Number(ret.price || 0)
      totalGasto += gasto
      worksheet.addRow([
        'ventas',
        ret.product?.name || '', // 👈 minúscula
        `perdida(${ret.reason || 'devuelto'})`,
        `s/${gasto}`,
        '',
      ])
    })

    // 8. Totales
    worksheet.addRow([])
    worksheet.addRow([
      '',
      '',
      'total',
      `s/${totalGasto}`,
      `s/${totalGanancia}`,
      '',
    ])

    // Ajustar ancho de columnas
    worksheet.columns.forEach((col) => {
      col.width = 20
    })

    // 9. Retornar buffer como Buffer de Node.js
    const arrayBuffer = await workbook.xlsx.writeBuffer()
    return Buffer.from(arrayBuffer)
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error en exportVentasExcel: ${error.message}`)
    }
    throw new Error('Error desconocido en exportVentasExcel')
  }
}
