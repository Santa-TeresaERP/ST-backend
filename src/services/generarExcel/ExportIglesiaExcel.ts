import ExcelJS from 'exceljs'
import { getDataDeIglesia } from './getDataDeIglesia'

// Interfaz para tipar los datos que vienen de getDataDeIglesia
interface IglesiaIncome {
  Module?: {
    name?: string
  }
  income_type?: string
  description?: string | null
  amount?: number | null
  date?: string | Date
}

export const exportIglesiaExcel = async (
  startDate: string,
  endDate: string,
): Promise<Buffer> => {
  try {
    const result = await getDataDeIglesia(startDate, endDate)

    if (!result.success || !result.data) {
      throw new Error(result.message || 'No se encontraron datos para exportar')
    }

    const ingresos: IglesiaIncome[] = result.data

    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('Ingresos Iglesia')

    // Título del reporte
    worksheet.addRow([`Reporte de Ingresos Iglesia: ${startDate} a ${endDate}`])
    worksheet.addRow([]) // Espacio en blanco

    // Encabezados de columna
    worksheet.addRow(['Fecha', 'Módulo', 'Tipo', 'Concepto / Nombre', 'Monto'])

    let totalMonto = 0

    ingresos.forEach((ingreso) => {
      // Formatear fecha
      const fecha = ingreso.date
        ? new Date(ingreso.date).toLocaleDateString('es-PE')
        : ''

      const modulo = ingreso.Module?.name || 'Iglesia'
      const tipo = ingreso.income_type || 'General' // Ej: 'donativo', 'limosna'

      // --- Lógica de parseo de descripción ---
      // La descripción original es algo como: "Ingreso Iglesia: Juan Perez - Tipo: donativo"
      let concepto = ingreso.description || ''

      // 1. Quitamos el prefijo estándar si existe
      concepto = concepto.replace(/^Ingreso Iglesia:\s*/i, '')

      // 2. Quitamos la parte del tipo porque ya la tenemos en otra columna
      // Cortamos el string antes de " - Tipo:"
      concepto = concepto.split(' - Tipo:')[0].trim()

      const monto = Number(ingreso.amount || 0)
      totalMonto += monto

      worksheet.addRow([
        fecha,
        modulo,
        tipo,
        concepto, // Aquí queda solo el nombre (ej: "Juan Perez") o evento
        `S/ ${monto.toFixed(2)}`,
      ])
    })

    // Fila de Totales
    worksheet.addRow([])
    worksheet.addRow([
      '',
      '',
      '',
      'TOTAL INGRESOS',
      `S/ ${totalMonto.toFixed(2)}`,
    ])

    // Estilos básicos: ancho de columnas
    worksheet.getColumn(1).width = 15 // Fecha
    worksheet.getColumn(2).width = 15 // Módulo
    worksheet.getColumn(3).width = 20 // Tipo
    worksheet.getColumn(4).width = 40 // Concepto
    worksheet.getColumn(5).width = 15 // Monto

    // Generar Buffer
    const arrayBuffer = await workbook.xlsx.writeBuffer()
    return Buffer.from(arrayBuffer)
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error en exportIglesiaExcel: ${error.message}`)
    }
    throw new Error('Error desconocido en exportIglesiaExcel')
  }
}
