import { v4 as uuidv4 } from 'uuid'
import { MonasteryExpense } from '@models/monasteryexpense'

export default async function createMonasteryExpense(
  data: Omit<MonasteryExpense, 'id' | 'created_at' | 'updated_at'>,
) {
  try {
    const expenseData = {
      ...data,
      id: uuidv4(),
      expense_date: new Date(data.expense_date),
    }

    const newExpense = await MonasteryExpense.create(expenseData)

    return {
      success: true,
      data: newExpense.toJSON(),
      message: 'Gasto del monasterio creado exitosamente',
    }
  } catch (error) {
    console.error('Error al crear el gasto del monasterio:', error)
    return {
      success: false,
      message: 'Error al crear el gasto del monasterio',
      error: error instanceof Error ? error.message : 'Error desconocido',
    }
  }
}
