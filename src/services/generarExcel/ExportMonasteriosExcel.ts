import ExcelJS from 'exceljs'
import { getDataDeMonasterio } from './getDataDeMonasterio'

interface MonasteryExpenseRow {
  category: string
  Name: string
  descripción: string
  amount: number
  date: Date
}

export const exportMonasteriosExcel = async (
  startDate: string,
  endDate: string,
): Promise<Buffer> => {
  try {
    const result = await getDataDeMonasterio(startDate, endDate)

    if (!result.success || !result.data) {
      throw new Error(result.message || 'No se encontraron datos para exportar')
    }

    const gastos: MonasteryExpenseRow[] = result.data

    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('Gastos del Monasterio')

    // Título
    worksheet.addRow([
      `Reporte de Gastos del Monasterio (${startDate} a ${endDate})`,
    ])
    worksheet.getRow(1).font = { bold: true, size: 14 }
    worksheet.mergeCells('A1:E1')

    worksheet.addRow([]) // Fila vacía

    // Encabezados
    worksheet.addRow([
      'Categoría',
      'Nombre del Gasto',
      'Descripción',
      'Fecha',
      'Monto (S/)',
    ])
    worksheet.getRow(3).font = { bold: true }

    let totalPago = 0

    gastos.forEach((g) => {
      const pago = Number(g.amount || 0)
      totalPago += pago

      worksheet.addRow([
        g.category,
        g.Name,
        g.descripción,
        g.date.toISOString().split('T')[0], // Fecha formateada YYYY-MM-DD
        pago.toFixed(2),
      ])
    })

    worksheet.addRow([])
    worksheet.addRow(['', '', 'TOTAL', '', totalPago.toFixed(2)])
    worksheet.getRow(worksheet.lastRow!.number).font = { bold: true }

    // Ajuste de tamaño de columnas
    worksheet.columns.forEach((col) => {
      col.width = 25
    })

    const arrayBuffer = await workbook.xlsx.writeBuffer()
    return Buffer.from(arrayBuffer)
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error en exportMonasteriosExcel: ${error.message}`)
    }
    throw new Error('Error desconocido en exportMonasteriosExcel')
  }
}
