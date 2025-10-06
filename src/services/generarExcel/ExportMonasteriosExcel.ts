import ExcelJS from 'exceljs'
import { getDataDeMonasterio } from './getDataDeMonasterio'

interface Monasterio {
  Module?: {
    name?: string
  }
  expense_type?: string | null
  description?: string | null
  amount?: number | string | null
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

    const gastos: Monasterio[] = result.data

    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('Monasterios')

    // Encabezado
    worksheet.addRow([`Reporte de Monasterios ${startDate} a ${endDate}`])
    worksheet.addRow([])
    worksheet.addRow(['Módulo', 'Tipo', 'Gasto', 'Pago'])

    let totalPago = 0

    gastos.forEach((g) => {
      const modulo = g.Module?.name || 'Monasterio'
      const tipo = g.expense_type || ''
      const descripcion = g.description || ''

      // extraer solo la primera parte de description antes del primer " - "
      const gasto = descripcion.split('-')[0].trim()

      const pago = Number(g.amount || 0)
      totalPago += pago

      worksheet.addRow([modulo, tipo, gasto, `s/${pago.toFixed(2)}`])
    })

    worksheet.addRow([])
    worksheet.addRow(['', '', 'TOTAL', `s/${totalPago.toFixed(2)}`])

    worksheet.columns.forEach((col) => (col.width = 25))

    const arrayBuffer = await workbook.xlsx.writeBuffer()
    return Buffer.from(arrayBuffer)
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error en exportMonasteriosExcel: ${error.message}`)
    }
    throw new Error('Error desconocido en exportMonasteriosExcel')
  }
}
