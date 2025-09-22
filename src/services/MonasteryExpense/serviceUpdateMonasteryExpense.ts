import { MonasteryExpense } from '@models/monasteryexpense'
import { UpdateMonasteryExpenseDTO } from '@types/finanzas/monasteryexpense'

export default async function updateMonasteryExpense(
  id: string,
  data: UpdateMonasteryExpenseDTO,
) {
  try {
    const expense = await MonasteryExpense.findByPk(id)

    if (!expense) {
      return {
        success: false,
        message: 'Gasto del monasterio no encontrado',
      }
    }

    const updatedExpense = await expense.update({
      ...data,
      expense_date: data.expense_date || expense.expense_date,
      description: data.description || expense.description,
      amount: data.amount || expense.amount,
      category: data.category || expense.category,
      payment_method: data.payment_method || expense.payment_method,
    })

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
