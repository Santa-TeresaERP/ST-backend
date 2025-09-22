import { v4 as uuidv4 } from 'uuid'
import { MonasteryExpense } from '@models/monasteryexpense'
import { CreateMonasteryExpenseDTO } from '@type/finanzas/monasteryexpense'

type MonasteryExpenseCreationAttributes = {
  id: string
  expense_date: Date
  description: string
  amount: number
  category: string
  payment_method: string
  receipt_number: string | null
  notes: string | null
}

export default async function createMonasteryExpense(
  data: CreateMonasteryExpenseDTO,
) {
  try {
    // Crear el objeto con los datos del nuevo gasto
    const expenseData: MonasteryExpenseCreationAttributes = {
      id: uuidv4(),
      expense_date: new Date(data.expense_date),
      description: data.description,
      amount: data.amount,
      category: data.category,
      payment_method: data.payment_method,
      receipt_number: data.receipt_number || null,
      notes: data.notes || null,
    }

    // Crear el nuevo registro de gasto
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
