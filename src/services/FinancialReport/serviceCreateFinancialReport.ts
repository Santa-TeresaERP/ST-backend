import { Op } from 'sequelize'
import sequelize from '@config/database'
import FinancialReport from '@models/financialReport'
import GeneralIncome from '@models/generalIncome'
import GeneralExpense from '@models/generalExpense'
import { FinancialReportAttributes } from '@type/finanzas/financialReport'
import { createFinancialReportValidation } from 'src/schemas/finanzas/financialReportSchema'

/**
 * Crea un nuevo reporte financiero mensual automáticamente.
 * - Sistema mensual: Cada reporte cubre un mes completo
 * - Auto-finalización: Al crear uno nuevo, finaliza el anterior con fecha fin de mes
 * - Descripción automática: "Registro del mes {mes}" si no se proporciona
 */
const serviceCreateFinancialReport = async (body: FinancialReportAttributes) => {
  const validation = createFinancialReportValidation(body)
  if (!validation.success) {
    console.error('Error de validación:', validation.error)
    return { error: JSON.stringify(validation.error.issues) }
  }

  const { start_date, observations } = validation.data

  const transaction = await sequelize.transaction()

  try {
    // 1. Buscar el reporte anterior activo (en proceso)
    const previousReport = await FinancialReport.findOne({
      where: { status: 'proceso' },
      order: [['createdAt', 'DESC']],
      transaction,
    })

    // 2. Si existe un reporte anterior, finalizarlo
    if (previousReport) {
      // Calcular el último día del mes del reporte anterior
      const previousStartDate = new Date(previousReport.start_date)
      const endOfMonth = new Date(
        previousStartDate.getFullYear(),
        previousStartDate.getMonth() + 1,
        0, // Día 0 del siguiente mes = último día del mes actual
      )

      // Obtener todos los ingresos sin reporte asignado en el mes
      const incomesToReport = await GeneralIncome.findAll({
        where: {
          report_id: null,
          date: {
            [Op.between]: [previousReport.start_date, endOfMonth],
          },
        },
        transaction,
      })

      // Obtener todos los gastos sin reporte asignado en el mes
      const expensesToReport = await GeneralExpense.findAll({
        where: {
          report_id: null,
          date: {
            [Op.between]: [previousReport.start_date, endOfMonth],
          },
        },
        transaction,
      })

      // Calcular totales
      const total_income = incomesToReport.reduce(
        (sum, item) => sum + item.amount,
        0,
      )
      const total_expenses = expensesToReport.reduce(
        (sum, item) => sum + item.amount,
        0,
      )
      const net_profit = total_income - total_expenses

      // Obtener el nombre del mes para las observaciones
      const monthNames = [
        'enero',
        'febrero',
        'marzo',
        'abril',
        'mayo',
        'junio',
        'julio',
        'agosto',
        'septiembre',
        'octubre',
        'noviembre',
        'diciembre',
      ]
      const reportMonth = monthNames[previousStartDate.getMonth()]
      const reportYear = previousStartDate.getFullYear()

      // Actualizar el reporte anterior con los datos finales
      await previousReport.update(
        {
          end_date: endOfMonth,
          total_income,
          total_expenses,
          net_profit,
          status: 'finalizado',
          observations: `Registro del mes ${reportMonth} ${reportYear}`,
        },
        { transaction },
      )

      // Asignar los ingresos y gastos al reporte finalizado
      await GeneralIncome.update(
        { report_id: previousReport.id },
        {
          where: {
            report_id: null,
            date: {
              [Op.between]: [previousReport.start_date, endOfMonth],
            },
          },
          transaction,
        },
      )

      await GeneralExpense.update(
        { report_id: previousReport.id },
        {
          where: {
            report_id: null,
            date: {
              [Op.between]: [previousReport.start_date, endOfMonth],
            },
          },
          transaction,
        },
      )

      console.log(
        `✅ Reporte anterior finalizado: ${reportMonth} ${reportYear} (hasta ${endOfMonth.toLocaleDateString()})`,
      )
    }

    // 3. Generar descripción automática si no se proporciona
    const newStartDate = new Date(start_date)
    const monthNames = [
      'enero',
      'febrero',
      'marzo',
      'abril',
      'mayo',
      'junio',
      'julio',
      'agosto',
      'septiembre',
      'octubre',
      'noviembre',
      'diciembre',
    ]
    const currentMonth = monthNames[newStartDate.getMonth()]
    const currentYear = newStartDate.getFullYear()
    
    const defaultObservations = `Registro del mes ${currentMonth} ${currentYear}`

    // 4. Crear el nuevo reporte con status "proceso"
    const newReportData = {
      start_date,
      end_date: null,
      total_income: 0,
      total_expenses: 0,
      net_profit: 0,
      status: 'proceso' as const,
      observations: observations || defaultObservations,
    }

    const newReport = await FinancialReport.create(newReportData, {
      transaction,
    })

    await transaction.commit()
    
    console.log(
      `✅ Nuevo reporte mensual creado: ${currentMonth} ${currentYear} (desde ${newStartDate.toLocaleDateString()})`,
    )
    return newReport
  } catch (error) {
    await transaction.rollback()
    console.error('Error al generar el reporte financiero:', error)
    return { error: 'Error inesperado al crear el reporte financiero' }
  }
}

export default serviceCreateFinancialReport
