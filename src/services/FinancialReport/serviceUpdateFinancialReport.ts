import FinancialReport from '@models/financialReport'
import { FinancialReportAttributes } from '@type/finanzas/financialReport'
import { updateFinancialReportValidation } from 'src/schemas/finanzas/financialReportSchema'

/**
 * Actualiza las observaciones y status de un reporte financiero existente.
 */
const serviceUpdateFinancialReport = async (
  id: string,
  body: Partial<FinancialReportAttributes>,
) => {
  const validation = updateFinancialReportValidation(body)
  if (!validation.success) {
    return { error: JSON.stringify(validation.error.issues) }
  }

  try {
    const report = await FinancialReport.findByPk(id)
    if (!report) {
      return { error: 'Reporte financiero no encontrado.' }
    }

    // Actualizamos solo los campos permitidos: observaciones y status
    const updateData: Partial<FinancialReportAttributes> = {}
    if (body.observations !== undefined) {
      updateData.observations = body.observations
    }
    if (body.status !== undefined) {
      updateData.status = body.status
    }

    await report.update(updateData)
    return report
  } catch (error) {
    console.error(
      `Error al actualizar el reporte financiero con ID ${id}:`,
      error,
    )
    return { error: 'Ocurrió un error inesperado al actualizar el reporte.' }
  }
}

export default serviceUpdateFinancialReport
