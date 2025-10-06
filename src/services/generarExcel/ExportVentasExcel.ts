import ExcelJS from 'exceljs'
import { getDataDeVentas } from './getDataDeVentas'

// Función para extraer el objeto (producto) de la descripción
function extractObject(description: string): string {
  if (!description) return ''
  // Buscar palabra después de ":" y antes de "-" (ej. "Pérdida en producción: pan - Tipo...")
  const match = description.match(/:\s*([^-]+)/)
  if (match && match[1]) {
    return match[1].trim()
  }
  return description // fallback
}

export const exportVentasExcel = async (
  startDate: string,
  endDate: string,
): Promise<Buffer> => {
  const result = await getDataDeVentas(startDate, endDate)
  if (!result.success || !result.data) {
    throw new Error('No se pudieron obtener los datos de ventas')
  }

  const {
    ingresosVentas,
    perdidasProduccion,
    gastosInventario,
    devolucionVentas,
  } = result.data

  const workbook = new ExcelJS.Workbook()
  const worksheet = workbook.addWorksheet('Ventas')

  // Encabezado con rango de fechas
  worksheet.addRow([`${startDate} ----> ${endDate}`])
  worksheet.addRow([])

  // Encabezados
  worksheet.addRow(['Módulo', 'Objeto', 'Tipo', 'Gasto', 'Ganancia'])

  let totalGasto = 0
  let totalGanancia = 0

  // 1. Ingresos (ganancias)
  ingresosVentas.forEach((item: any) => {
    const ganancia = Number(item.amount)
    totalGanancia += ganancia

    worksheet.addRow([
      item.Module?.name || 'Ventas',
      'Registro de venta',
      item.income_type,
      '',
      `s/${ganancia}`,
    ])
  })

  // Helper para agregar gastos
  function addGastoRow(item: any) {
    const gasto = Number(item.amount)
    totalGasto += gasto

    worksheet.addRow([
      item.Module?.name || '',
      extractObject(item.description),
      item.expense_type,
      `s/${gasto}`,
      '',
    ])
  }

  // 2. Pérdidas de Producción
  perdidasProduccion.forEach(addGastoRow)

  // 3. Gastos de Inventario
  gastosInventario.forEach(addGastoRow)

  // 4. Devoluciones de Venta
  devolucionVentas.forEach(addGastoRow)

  // Fila final de totales
  worksheet.addRow([])
  worksheet.addRow(['', '', 'TOTAL', `s/${totalGasto}`, `s/${totalGanancia}`])

  // Ajustar ancho de columnas
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

  // Convertir el resultado a Buffer de Node
  const arrayBuffer = await workbook.xlsx.writeBuffer()
  return Buffer.from(arrayBuffer)
}
