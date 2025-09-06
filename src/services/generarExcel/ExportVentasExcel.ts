import ExcelJS from 'exceljs'
import { getDataDeVentas } from './DataDepVentas'

export const exportVentasExcel = async (startDate: string, endDate: string) => {
  try {
    // 1. Obtener datos con el otro service
    const result = await getDataDeVentas(startDate, endDate)

    if (!result.success || !result.data) {
      throw new Error(result.message || 'No se encontraron datos para exportar')
    }

    const { buysResources, productions, losts, sales, returns } = result.data

    // 2. Crear un nuevo workbook
    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('Departamento de Ventas')

    // 3. Encabezados
    worksheet.addRow([`${startDate} ----> ${endDate}`])
    worksheet.addRow([])
    worksheet.addRow([
      'modulo',
      'objeto',
      'tipo',
      'gasto',
      'ganancia',
    ])

    let totalGasto = 0
    let totalGanancia = 0

    // 4. Agregar datos de buysResources (inventario)
    buysResources.forEach((item: any) => {
      const gasto = Number(item.cost || 0)
      totalGasto += gasto
      worksheet.addRow([
        'inventario',
        item.resource?.name || '',
        'recurso',
        `s/${gasto}`,
        '',
      ])
    })

    // 5. Agregar datos de productions
    productions.forEach((item: any) => {
      const gasto = Number(item.cost || 0)
      totalGasto += gasto
      worksheet.addRow([
        'produccion',
        item.product?.name || '',
        'producto',
        `s/${gasto}`,
        '',
      ])
    })

    // 6. Agregar datos de pérdidas
    losts.forEach((item: any) => {
      const gasto = Number(item.amount || 0)
      totalGasto += gasto
      worksheet.addRow([
        'produccion',
        item.product?.name || '',
        'perdida',
        `s/${gasto}`,
        '',
      ])
    })

    // 7. Agregar datos de ventas
    sales.forEach((item: any) => {
      const ganancia = Number(item.total || 0)
      totalGanancia += ganancia
      worksheet.addRow([
        'ventas',
        item.product?.name || '',
        'venta',
        '',
        `s/${ganancia}`,
      ])
    })

    // 8. Agregar datos de devoluciones
    returns.forEach((item: any) => {
      const gasto = Number(item.price || 0)
      totalGasto += gasto
      worksheet.addRow([
        'ventas',
        item.product?.name || '',
        'perdida(devuelto)',
        `s/${gasto}`,
        '',
      ])
    })

    // 9. Fila total
    worksheet.addRow([])
    worksheet.addRow(['', '', 'total', `s/${totalGasto}`, `s/${totalGanancia}`])

    // Ajustar ancho de columnas
    worksheet.columns.forEach((col) => {
      col.width = 18
    })

    // 10. Retornar el buffer del Excel
    const buffer = await workbook.xlsx.writeBuffer()
    return buffer
  } catch (error: any) {
    throw new Error(`Error en exportVentasExcel: ${error.message}`)
  }
}
