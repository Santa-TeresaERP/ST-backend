import { Op } from 'sequelize'
import sequelize from '@config/database'
import FinancialReport from '@models/financialReport'
import GeneralIncome from '@models/generalIncome'
import GeneralExpense from '@models/generalExpense'
import { FinancialReportAttributes } from '@type/finanzas/financialReport'
import { createFinancialReportValidation } from 'src/schemas/finanzas/financialReportSchema'

/**
 * Genera un nuevo reporte financiero.
 * 1. Busca todos los ingresos y gastos sin reporte en un rango de fechas.
 * 2. Calcula los totales y el beneficio neto.
 * 3. Crea el registro en la tabla `financial_reports`.
 * 4. Asigna el ID del nuevo reporte a los ingresos y gastos procesados.
 * Todo se ejecuta dentro de una transacción para garantizar la integridad de los datos.
 */
const serviceCreateFinancialReport = async (
  body: FinancialReportAttributes,
) => {
  const validation = createFinancialReportValidation(body)
  if (!validation.success) {
    return { error: JSON.stringify(validation.error.issues) }
  }

  const { start_date, end_date, status, observations } = validation.data
  const transaction = await sequelize.transaction()

  try {
    const incomesToReport = await GeneralIncome.findAll({
      where: {
        report_id: null,
        date: { [Op.between]: [start_date, end_date] },
      },
      transaction,
    })
    const expensesToReport = await GeneralExpense.findAll({
      where: {
        report_id: null,
        date: { [Op.between]: [start_date, end_date] },
      },
      transaction,
    })

    const total_income = incomesToReport.reduce(
      (sum, item) => sum + item.amount,
      0,
    )
    const total_expenses = expensesToReport.reduce(
      (sum, item) => sum + item.amount,
      0,
    )
    const net_profit = total_income - total_expenses

    const newReport = await FinancialReport.create(
      {
        start_date,
        end_date,
        total_income,
        total_expenses,
        net_profit,
        status,
        observations,
      },
      { transaction },
    )

    const incomeIds = incomesToReport.map((i) => i.id)
    const expenseIds = expensesToReport.map((e) => e.id)

    if (incomeIds.length > 0) {
      await GeneralIncome.update(
        { report_id: newReport.id },
        { where: { id: incomeIds }, transaction },
      )
    }
    if (expenseIds.length > 0) {
      await GeneralExpense.update(
        { report_id: newReport.id },
        { where: { id: expenseIds }, transaction },
      )
    }

    await transaction.commit()
    return newReport
  } catch (error) {
    await transaction.rollback()
    console.error('Error al generar el reporte financiero:', error)
    return { error: 'Ocurrió un error inesperado al generar el reporte.' }
  }
}

export default serviceCreateFinancialReport
