import ExcelJS from 'exceljs'
import { getDataDeMuseo } from './getDataDeMuseo'

export const exportMuseoExcel = async (
  startDate: string,
  endDate: string,
): Promise<Buffer> => {
  try {
    const result = await getDataDeMuseo(startDate, endDate)

    if (!result.success || !result.data) {
      throw new Error('No se pudieron obtener los datos de Museo')
    }

    const data = result.data as any[]

    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('Reporte Museo')

    // ===============================
    // 1. TÍTULO
    // ===============================
    worksheet.mergeCells('A1:D1')
    const titleCell = worksheet.getCell('A1')
    titleCell.value = `Reporte Museo ${startDate} a ${endDate}`

    worksheet.addRow([]) // fila vacía

    // ===============================
    // 2. ENCABEZADOS
    // ===============================
    worksheet.addRow(['Módulo', 'Tipo', 'Nro de venta', 'Monto'])

    // ===============================
    // 3. FILAS DE DATOS
    // ===============================
    let total = 0
    data.forEach((item) => {
      const nroVentaMatch = item.description.match(/#V-\d+/)
      const nroVenta = nroVentaMatch ? nroVentaMatch[0] : ''

      const monto = parseFloat(item.amount)
      total += monto

      worksheet.addRow([
        item.Module?.name || 'Museo',
        item.income_type,
        nroVenta,
        `s/${monto.toFixed(2)}`,
      ])
    })

    // ===============================
    // 4. FILA TOTAL
    // ===============================
    worksheet.addRow([])
    worksheet.addRow(['', '', 'TOTAL', `s/${total.toFixed(2)}`])

    // ===============================
    // 5. AJUSTE ANCHO
    // ===============================
    if (worksheet.columns) {
      ;(worksheet.columns as ExcelJS.Column[]).forEach((col) => {
        let maxLength = 10
        col.eachCell({ includeEmpty: true }, (cell) => {
          const value = cell.value ? cell.value.toString() : ''
          maxLength = Math.max(maxLength, value.length)
        })
        col.width = maxLength + 2
      })
    }

    const buffer = await workbook.xlsx.writeBuffer()
    return Buffer.from(buffer)
  } catch (error) {
    console.error('Error en exportMuseoExcel:', error)
    throw error
  }
}
