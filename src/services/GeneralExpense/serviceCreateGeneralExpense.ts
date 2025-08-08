import GeneralExpense from '@models/generalExpense'
import { GeneralExpenseAttributes } from '@type/finanzas/generalExpense'
import { createGeneralExpenseValidation } from 'src/schemas/finanzas/generalExpenseSchema'
import Module from '@models/modules' // Importamos Module para verificar su existencia

const serviceCreateGeneralExpense = async (body: GeneralExpenseAttributes) => {
  // 1. Validar los datos de entrada
  const validation = createGeneralExpenseValidation(body)
  if (!validation.success) {
    return { error: JSON.stringify(validation.error.issues) }
  }

  const { module_id, expense_type, amount, date, description } = validation.data

  try {
    // 2. (Opcional pero recomendado) Verificar que el módulo asociado existe
    const moduleExists = await Module.findByPk(module_id)
    if (!moduleExists) {
      return { error: `El módulo con ID ${module_id} no existe.` }
    }

    // 3. Crear el nuevo registro de gasto
    const newExpense = await GeneralExpense.create({
      module_id,
      expense_type,
      amount,
      date,
      description,
      // report_id se deja como null por defecto
    })

    return newExpense
  } catch (error) {
    console.error('Error al crear el gasto general:', error)
    return { error: 'Ocurrió un error inesperado al crear el gasto.' }
  }
}

export default serviceCreateGeneralExpense
