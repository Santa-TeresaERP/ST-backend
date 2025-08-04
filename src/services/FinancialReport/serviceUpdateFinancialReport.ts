import FinancialReport from '@models/financialReport';
import { FinancialReportAttributes } from '@type/finanzas/financialReport';
import { updateFinancialReportValidation } from 'src/schemas/finanzas/financialReportSchema';

/**
 * Actualiza las observaciones de un reporte financiero existente.
 */
const serviceUpdateFinancialReport = async (id: string, body: Partial<FinancialReportAttributes>) => {
  const validation = updateFinancialReportValidation(body);
  if (!validation.success) {
    return { error: JSON.stringify(validation.error.issues) };
  }

  try {
    const report = await FinancialReport.findByPk(id);
    if (!report) {
      return { error: 'Reporte financiero no encontrado.' };
    }

    // Solo actualizamos las observaciones
    await report.update({ observations: body.observations });
    return report;

  } catch (error) {
    console.error(`Error al actualizar el reporte financiero con ID ${id}:`, error);
    return { error: 'Ocurrió un error inesperado al actualizar el reporte.' };
  }
};

export default serviceUpdateFinancialReport;