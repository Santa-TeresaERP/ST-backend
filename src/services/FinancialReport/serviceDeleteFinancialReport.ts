import sequelize from '@config/database'
import FinancialReport from '@models/financialReport'
import GeneralIncome from '@models/generalIncome'
import GeneralExpense from '@models/generalExpense'

/**
 * Elimina un reporte financiero.
 * 1. Libera los ingresos y gastos asociados estableciendo su `report_id` a `null`.
 * 2. Elimina el registro del reporte.
 * Todo se ejecuta en una transacción.
 */
const serviceDeleteFinancialReport = async (id: string) => {
  const transaction = await sequelize.transaction()
  try {
    const report = await FinancialReport.findByPk(id, { transaction })
    if (!report) {
      await transaction.rollback()
      return { error: 'Reporte financiero no encontrado.' }
    }

    // Liberar los ingresos y gastos asociados
    await GeneralIncome.update(
      { report_id: null },
      { where: { report_id: id }, transaction },
    )
    await GeneralExpense.update(
      { report_id: null },
      { where: { report_id: id }, transaction },
    )

    // Eliminar el reporte
    await report.destroy({ transaction })

    await transaction.commit()
    return {
      message:
        'Reporte financiero eliminado y transacciones liberadas correctamente.',
    }
  } catch (error) {
    await transaction.rollback()
    console.error(
      `Error al eliminar el reporte financiero con ID ${id}:`,
      error,
    )
    return { error: 'Ocurrió un error inesperado al eliminar el reporte.' }
  }
}

export default serviceDeleteFinancialReport
