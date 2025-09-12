import Overhead from '@models/overhead'

const serviceGetMonthlyExpense = async () => {
  try {
    const overheads = await Overhead.findAll({
      where: {
        type: 'gasto mensual',
      },
    })
    if (!overheads || overheads.length === 0) {
      throw new Error('No overheads found for the specified month and year')
    }
    return overheads
  } catch (error) {
    console.error(`❌ Error fetching monthly expenses`, error)
    throw error
  }
}

export default serviceGetMonthlyExpense
