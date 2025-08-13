import FinancialReport from '@models/financialReport'
import { FinancialReportAttributes } from '@type/finanzas/financialReport'
/**
 * Actualiza las observaciones y status de un reporte financiero existente.
 */
const serviceUpdateFinancialReport = async (
  id: string,
  payload: Partial<FinancialReportAttributes>,
) => {
  try {
    const report = await FinancialReport.findByPk(id)
    if (!report) return { error: 'Reporte no encontrado' }

    // Actualizar solo lo que viene en payload
    if (payload.end_date !== undefined) report.end_date = payload.end_date
    if (payload.observations !== undefined)
      report.observations = payload.observations
    if (payload.status !== undefined) report.status = payload.status

    await report.save()
    return report
  } catch (error) {
    console.error(error)
    return { error: 'Error al actualizar reporte' }
  }
}

export default serviceUpdateFinancialReport
