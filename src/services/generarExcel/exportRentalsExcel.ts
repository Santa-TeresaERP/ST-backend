import ExcelJS from 'exceljs'
import { serviceGetRentalsByDate } from './serviceGetRentalsByDate'

export const exportRentalsExcel = async (
  startDate: string,
  endDate: string,
): Promise<Buffer> => {
  try {
    // 1. Obtener los datos
    const result = await serviceGetRentalsByDate(startDate, endDate)
    if (!result.success || !result.data) {
      throw new Error(
        result.message || 'No se encontraron alquileres para exportar',
      )
    }

    const rentals = result.data

    // 2. Crear Excel
    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('Departamento de Alquileres')

    worksheet.addRow([`Alquileres del ${startDate} al ${endDate}`])
    worksheet.addRow([])
    worksheet.addRow(['Cliente', 'Lugar', 'Usuario', 'Monto'])

    let total = 0

    rentals.forEach((rental: any) => {
      const monto = Number(rental.amount || 0)
      total += monto
      worksheet.addRow([
        rental.customer_name || '',
        rental.place_name || '',
        rental.user_name || '',
        `s/${monto}`,
      ])
    })

    worksheet.addRow([])
    worksheet.addRow(['', '', 'Total', `s/${total}`])

    worksheet.columns.forEach((col) => {
      col.width = 25
    })

    const arrayBuffer = await workbook.xlsx.writeBuffer()
    return Buffer.from(arrayBuffer)
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error en exportRentalsExcel: ${error.message}`)
    }
    throw new Error('Error desconocido en exportRentalsExcel')
  }
}
