import MonasteryExpense from '@models/monasteryexpense'

export default async function getAllMonasteryExpenses() {
  try {
    const expenses = await MonasteryExpense.findAll({
      order: [['date', 'DESC']],
    })

    return {
      success: true,
      data: expenses,
    }
  } catch (error) {
    console.error('❌ Error al obtener los gastos del monasterio:', error)
    return {
      success: false,
      message: 'Error al obtener los gastos del monasterio',
      error: error instanceof Error ? error.message : 'Error desconocido',
    }
  }
}
