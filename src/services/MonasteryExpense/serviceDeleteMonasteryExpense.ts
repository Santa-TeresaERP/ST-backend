import { MonasteryExpense } from '@models/monasteryexpense'

export default async function deleteMonasteryExpense(id: string) {
  try {
    const expense = await MonasteryExpense.findByPk(id)

    if (!expense) {
      return {
        success: false,
        message: 'Gasto del monasterio no encontrado',
      }
    }

    await expense.destroy()

    return {
      success: true,
      message: 'Gasto del monasterio eliminado exitosamente',
    }
  } catch (error) {
    console.error('Error al eliminar el gasto del monasterio:', error)
    return {
      success: false,
      message: 'Error al eliminar el gasto del monasterio',
      error: error instanceof Error ? error.message : 'Error desconocido',
    }
  }
}
