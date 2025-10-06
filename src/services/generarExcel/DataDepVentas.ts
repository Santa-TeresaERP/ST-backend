import { Op } from 'sequelize'
import GeneralIncome from '@models/generalIncome'
import GeneralExpense from '@models/generalExpense'
import Module from '@models/modules'

export const getGeneralReport = async (startDate: string, endDate: string) => {
  try {
    if (!startDate || !endDate) {
      throw new Error('Debes enviar startDate y endDate')
    }

    // Normalizar fechas al inicio y fin del día
    const start = new Date(startDate)
    start.setHours(0, 0, 0, 0)

    const end = new Date(endDate)
    end.setHours(23, 59, 59, 999)

    // Filtro por campo "date" de las tablas
    const filters = {
      date: {
        [Op.between]: [start, end],
      },
    }

    const incomes = await GeneralIncome.findAll({
      where: filters,
      include: [{ model: Module, attributes: ['name'] }],
      order: [['date', 'DESC']],
    })

    const expenses = await GeneralExpense.findAll({
      where: filters,
      include: [{ model: Module, attributes: ['name'] }],
      order: [['date', 'DESC']],
    })

    // Helper para normalizar strings
    const normalize = (str?: string) => str?.toLowerCase().trim() ?? ''

    // Clasificación
    const buysResources = expenses.filter((e) =>
      normalize(e.expense_type).includes('compra'),
    )

    const productions = incomes.filter((i) =>
      normalize(i.income_type).includes('producción'),
    )

    const losts = expenses.filter((e) =>
      normalize(e.expense_type).includes('pérdida'),
    )

    const sales = incomes.filter(
      (i) =>
        normalize(i.income_type).includes('venta') &&
        normalize(i.description ?? '').startsWith('registro de venta'),
    )

    const returns = expenses.filter((e) =>
      normalize(e.expense_type).includes('devolución'),
    )

    return {
      success: true as const,
      message: 'Reporte general generado correctamente',
      data: {
        buysResources,
        productions,
        losts,
        sales,
        returns,
      },
    }
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : 'Error desconocido en getGeneralReport'

    return {
      success: false as const,
      message: `Error en getGeneralReport: ${message}`,
    }
  }
}
