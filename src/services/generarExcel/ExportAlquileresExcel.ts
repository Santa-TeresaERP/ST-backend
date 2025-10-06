import ExcelJS from 'exceljs'
import { getDataDeAlquileres } from './getDataDeAlquileres'

interface Alquiler {
  Module?: {
    name?: string
  }
  description?: string | null
  amount?: number | null
}

export const exportAlquileresExcel = async (
  startDate: string,
  endDate: string,
): Promise<Buffer> => {
  try {
    const result = await getDataDeAlquileres(startDate, endDate)
    if (!result.success || !result.data) {
      throw new Error(result.message || 'No se encontraron datos para exportar')
    }

    const alquileres: Alquiler[] = result.data

    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('Alquileres')

    worksheet.addRow([`Reporte General ${startDate} a ${endDate}`])
    worksheet.addRow([])
    worksheet.addRow(['Módulo', 'Tipo', 'Cliente', 'Vendedor', 'Pago'])

    let totalPago = 0

    alquileres.forEach((alq) => {
      const modulo = alq.Module?.name || 'Alquileres'
      const description = alq.description || ''
      const tipo = description.split(' - Cliente:')[0] || ''

      const clienteMatch = description.match(/Cliente:\s*([^–-]*)/)
      const vendedorMatch = description.match(/Vendedor:\s*([^–-]*)/)

      const cliente = clienteMatch ? clienteMatch[1].trim() : ''
      const vendedor = vendedorMatch ? vendedorMatch[1].trim() : ''

      const pago = Number(alq.amount || 0)
      totalPago += pago

      worksheet.addRow([
        modulo,
        tipo,
        cliente,
        vendedor,
        `s/${pago.toFixed(2)}`,
      ])
    })

    worksheet.addRow([])
    worksheet.addRow(['', '', '', 'TOTAL', `s/${totalPago.toFixed(2)}`])
    worksheet.columns.forEach((col) => (col.width = 25))

    const arrayBuffer = await workbook.xlsx.writeBuffer()
    return Buffer.from(arrayBuffer)
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error en exportAlquileresExcel: ${error.message}`)
    }
    throw new Error('Error desconocido en exportAlquileresExcel')
  }
}
