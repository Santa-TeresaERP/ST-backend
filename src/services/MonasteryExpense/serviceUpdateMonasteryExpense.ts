import { MonasteryExpense } from '@models/monasteryexpense'

export default async function updateMonasteryExpense(
  id: string,
  data: Partial<Omit<MonasteryExpense, 'id' | 'created_at' | 'updated_at'>>,
) {
  try {
    const expense = await MonasteryExpense.findByPk(id)

    if (!expense) {
      return {
        success: false,
        message: 'Gasto del monasterio no encontrado',
      }
    }

    const updatedExpense = await expense.update(data)

    return {
      success: true,
      data: updatedExpense.toJSON(),
      message: 'Gasto del monasterio actualizado exitosamente',
    }
  } catch (error) {
    console.error('Error al actualizar el gasto del monasterio:', error)
    return {
      success: false,
      message: 'Error al actualizar el gasto del monasterio',
      error: error instanceof Error ? error.message : 'Error desconocido',
    }
  }
}
