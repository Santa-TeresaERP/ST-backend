import Overhead from '@models/overhead'

const serviceGetMonthlyExpense = async () => {
  try {
    const overheads = await Overhead.findAll({
      where: {
        type: 'gasto mensual',
        status: 'true',
      },
    })

    // 👉 en vez de lanzar error, devolvemos []
    if (!overheads || overheads.length === 0) {
      return []
    }

    return overheads
  } catch (error) {
    console.error(`❌ Error fetching monthly expenses`, error)
    // si quieres, puedes devolver [] aquí también en vez de throw
    return []
  }
}

export default serviceGetMonthlyExpense
