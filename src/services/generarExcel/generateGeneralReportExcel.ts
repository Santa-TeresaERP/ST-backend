import ExcelJS from 'exceljs'
import { getGeneralReport } from './DataDepVentas'

// Función auxiliar para formatear moneda
const formatCurrency = (value: number): string => {
  return `s/${value.toFixed(2)}`
}

// Función para extraer el objeto desde "description"
const extractObject = (description: string): string => {
  if (!description) return ''

  // Caso especial: ventas
  if (description.toLowerCase().startsWith('registro de venta')) {
    return 'Registro de venta'
  }

  const match =
    description.match(/Compra de recurso:\s*(.*?)\s*-/i) || // Compras
    description.match(/Pérdida en producción:\s*(.*?)\s*-/i) || // Pérdidas
    description.match(/Venta de producto:\s*(.*?)\s*-/i) || // Ventas con producto explícito
    description.match(/Devolución de producto:\s*(.*?)\s*-/i) // Devoluciones

  return match ? match[1].trim() : description
}
export const generateGeneralReportExcel = async (
  startDate: string,
  endDate: string,
) => {
  // 1. Obtener data del reporte general
  const report = await getGeneralReport(startDate, endDate)

  if (!report.success) {
    throw new Error(report.message)
  }

  const { buysResources, productions, losts, sales, returns } = report.data

  // 2. Crear un workbook
  const workbook = new ExcelJS.Workbook()
  const worksheet = workbook.addWorksheet('Reporte General')

  // 3. Encabezado principal
  worksheet.mergeCells('A1:E1')
  worksheet.getCell('A1').value = `Reporte General ${startDate} a ${endDate}`
  worksheet.getCell('A1').alignment = { horizontal: 'center' }
  worksheet.getCell('A1').font = { bold: true, size: 14 }

  // 4. Encabezados de columnas
  worksheet.addRow([])
  worksheet.addRow(['Módulo', 'Objeto', 'Tipo', 'Gasto', 'Ganancia'])
  worksheet.getRow(3).font = { bold: true }

  // 5. Función para agregar filas
  const addRows = (
    rows: any[],
    modulo: string,
    tipo: string,
    isIncome = false,
  ) => {
    rows.forEach((r) => {
      const objeto = extractObject(r.description || '')

      worksheet.addRow([
        r.Module?.name || modulo, // Módulo (usa el nombre del módulo si está)
        objeto, // Objeto limpio
        tipo, // Tipo
        isIncome ? '' : formatCurrency(Number(r.amount || 0)), // Gasto
        isIncome ? formatCurrency(Number(r.amount || 0)) : '', // Ganancia
      ])
    })
  }

  // 6. Agregar cada sección
  addRows(buysResources, 'Inventario', 'Recurso', false)
  addRows(productions, 'Producción', 'Producto', false)
  addRows(losts, 'Producción', 'Pérdida', false)
  addRows(sales, 'Ventas', 'Venta', true)
  addRows(returns, 'Ventas', 'Devolución', false)

  // 7. Totales
  worksheet.addRow([])
  const gastosTotales =
    buysResources.reduce((sum, r) => sum + Number(r.amount || 0), 0) +
    productions.reduce((sum, r) => sum + Number(r.amount || 0), 0) +
    losts.reduce((sum, r) => sum + Number(r.amount || 0), 0) +
    returns.reduce((sum, r) => sum + Number(r.amount || 0), 0)

  const gananciasTotales = sales.reduce(
    (sum, r) => sum + Number(r.amount || 0),
    0,
  )

  worksheet.addRow([
    'TOTAL',
    '',
    '',
    formatCurrency(gastosTotales),
    formatCurrency(gananciasTotales),
  ])
  worksheet.getRow(worksheet.lastRow?.number || 1).font = { bold: true }

  // 8. Generar buffer del Excel
  const buffer = await workbook.xlsx.writeBuffer()
  return buffer
}
