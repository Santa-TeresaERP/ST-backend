import { MonasteryExpense } from '@models/monasteryexpense'

export default async function getMonasteryExpenseById(id: string) {
  try {
    const expense = await MonasteryExpense.findByPk(id)

    if (!expense) {
      return {
        success: false,
        message: 'Gasto del monasterio no encontrado',
      }
    }

    return {
      success: true,
      data: expense.toJSON(),
    }
  } catch (error) {
    console.error('Error al obtener el gasto del monasterio:', error)
    return {
      success: false,
      message: 'Error al obtener el gasto del monasterio',
      error: error instanceof Error ? error.message : 'Error desconocido',
    }
  }
}
