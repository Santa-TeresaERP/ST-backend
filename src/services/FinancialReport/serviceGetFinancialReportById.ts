import FinancialReport from '@models/financialReport';
import GeneralIncome from '@models/generalIncome';
import GeneralExpense from '@models/generalExpense';

/**
 * Obtiene un reporte financiero específico por su ID.
 * Incluye los detalles de ingresos y gastos asociados.
 */
const serviceGetFinancialReportById = async (id: string) => {
  try {
    const report = await FinancialReport.findByPk(id, {
      include: [
        { model: GeneralIncome, as: 'incomes' },
        { model: GeneralExpense, as: 'expenses' },
      ],
    });

    if (!report) {
      return { error: 'Reporte financiero no encontrado.' };
    }

    return report;
  } catch (error) {
    console.error(`Error al obtener el reporte financiero con ID ${id}:`, error);
    return { error: 'Ocurrió un error inesperado al obtener el reporte.' };
  }
};

export default serviceGetFinancialReportById;