import { Op } from 'sequelize'
import sequelize from '@config/database'
import FinancialReport from '@models/financialReport'
import GeneralIncome from '@models/generalIncome'
import GeneralExpense from '@models/generalExpense'
import { FinancialReportAttributes } from '@type/finanzas/financialReport'
import { createFinancialReportValidation } from 'src/schemas/finanzas/financialReportSchema'

/**
 * Crea un nuevo reporte financiero.
 * Si el status es "proceso", se crean campos con valores "En proceso..."
 * Si el status es "finalizado", se calculan los totales.
 */
const serviceCreateFinancialReport = async (body: FinancialReportAttributes) => {
  const validation = createFinancialReportValidation(body)
  if (!validation.success) {
    console.error('Error de validación:', validation.error)
    return { error: JSON.stringify(validation.error.issues) }
  }

  const { start_date, status, observations } = validation.data

  let end_date = null

  if (status === 'finalizado' && !end_date) {
    return { error: 'end_date es obligatorio al finalizar' }
  }

  const transaction = await sequelize.transaction()

  try {
    let total_income = 0
    let total_expenses = 0
    let net_profit = 0

    if (status === 'finalizado') {
      const incomesToReport = await GeneralIncome.findAll({
        where: {
          report_id: null,
          date: { [Op.between]: [start_date, end_date!] }
        },
        transaction,
      })

      const expensesToReport = await GeneralExpense.findAll({
        where: {
          report_id: null,
          date: { [Op.between]: [start_date, end_date!] }
        },
        transaction,
      })

      total_income = incomesToReport.reduce((sum, item) => sum + item.amount, 0)
      total_expenses = expensesToReport.reduce((sum, item) => sum + item.amount, 0)
      net_profit = total_income - total_expenses
    }

    const reportData = {
      start_date,
      end_date: status === 'finalizado' ? end_date : null,
      total_income,
      total_expenses,
      net_profit,
      status,
      observations,
    }

    const newReport = await FinancialReport.create(reportData, { transaction })

    if (status === 'finalizado') {
      await GeneralIncome.update(
        { report_id: newReport.id },
        {
          where: {
            report_id: null,
            date: { [Op.between]: [start_date, end_date!] }
          },
          transaction,
        }
      )
      await GeneralExpense.update(
        { report_id: newReport.id },
        {
          where: {
            report_id: null,
            date: { [Op.between]: [start_date, end_date!] }
          },
          transaction,
        }
      )
    }

    await transaction.commit()
    return newReport
  } catch (error) {
    await transaction.rollback()
    console.error('Error al generar el reporte financiero:', error)
    return { error: 'Error inesperado' }
  }
}

export default serviceCreateFinancialReport
