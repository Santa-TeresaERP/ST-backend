import GeneralExpense from '@models/generalExpense'
import Module from '@models/modules'

/**
 * Obtiene un gasto específico por su ID.
 * Incluye el nombre del módulo asociado.
 */
const serviceGetGeneralExpenseById = async (id: string) => {
  try {
    const expense = await GeneralExpense.findByPk(id, {
      include: [
        {
          model: Module,
          attributes: ['name'],
        },
      ],
    })

    if (!expense) {
      return { error: 'Gasto no encontrado.' }
    }

    return expense
  } catch (error) {
    console.error(`Error al obtener el gasto con ID ${id}:`, error)
    return { error: 'Ocurrió un error inesperado al obtener el gasto.' }
  }
}

export default serviceGetGeneralExpenseById
