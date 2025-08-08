import FinancialReport from '@models/financialReport'
import GeneralIncome from '@models/generalIncome'
import GeneralExpense from '@models/generalExpense'

/**
 * Obtiene todos los reportes financieros.
 * Incluye los detalles de ingresos y gastos asociados a cada reporte.
 * Ordena los reportes por fecha de inicio descendente (los más recientes primero).
 */
const serviceGetAllFinancialReports = async () => {
  try {
    const reports = await FinancialReport.findAll({
      include: [
        { model: GeneralIncome, as: 'incomes' },
        { model: GeneralExpense, as: 'expenses' },
      ],
      order: [['start_date', 'DESC']],
    })
    return reports
  } catch (error) {
    console.error('Error al obtener los reportes financieros:', error)
    return { error: 'Ocurrió un error inesperado al obtener los reportes.' }
  }
}

export default serviceGetAllFinancialReports
