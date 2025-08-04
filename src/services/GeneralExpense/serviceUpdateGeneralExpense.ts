import GeneralExpense from '@models/generalExpense';
import { GeneralExpenseAttributes } from '@type/finanzas/generalExpense';
import { updateGeneralExpenseValidation } from 'src/schemas/finanzas/generalExpenseSchema';

/**
 * Actualiza un registro de gasto existente.
 * No permite la modificación si el gasto ya está asociado a un reporte financiero.
 */
const serviceUpdateGeneralExpense = async (id: string, body: Partial<GeneralExpenseAttributes>) => {
  const validation = updateGeneralExpenseValidation(body);
  if (!validation.success) {
    return { error: JSON.stringify(validation.error.issues) };
  }

  try {
    const expense = await GeneralExpense.findByPk(id);
    if (!expense) {
      return { error: 'Gasto no encontrado.' };
    }

    // Regla de negocio: no se puede editar un gasto que ya está en un reporte.
    if (expense.report_id) {
      return { error: 'Este gasto ya ha sido incluido en un reporte financiero y no puede ser modificado.' };
    }

    await expense.update(body);
    return expense;

  } catch (error) {
    console.error(`Error al actualizar el gasto con ID ${id}:`, error);
    return { error: 'Ocurrió un error inesperado al actualizar el gasto.' };
  }
};

export default serviceUpdateGeneralExpense;