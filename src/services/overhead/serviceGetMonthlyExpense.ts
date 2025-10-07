import Overhead from '@models/overhead'

const serviceGetMonthlyExpense = async () => {
  try {
    const overheads = await Overhead.findAll({
      where: {
        type: 'gasto mensual',
        status: true, // Cambiar a boolean en lugar de string
      },
    })

    if (!overheads || overheads.length === 0) {
      return {
        success: true,
        data: [],
        message: 'No hay gastos mensuales registrados para este período',
      }
    }

    return {
      success: true,
      data: overheads,
      message: `Se encontraron ${overheads.length} gastos mensuales`,
    }
  } catch (error) {
    console.error(`❌ Error fetching monthly expenses`, error)
    return {
      success: false,
      data: [],
      message: 'Error al obtener los gastos mensuales',
      error: error instanceof Error ? error.message : 'Error desconocido',
    }
  }
}

export default serviceGetMonthlyExpense
