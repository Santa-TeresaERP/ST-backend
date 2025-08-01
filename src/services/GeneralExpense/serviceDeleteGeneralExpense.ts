import GeneralExpense from '@models/generalExpense';

/**
 * Elimina un registro de gasto.
 * No permite la eliminación si el gasto ya está asociado a un reporte financiero.
 */
const serviceDeleteGeneralExpense = async (id: string) => {
  try {
    const expense = await GeneralExpense.findByPk(id);
    if (!expense) {
      return { error: 'Gasto no encontrado.' };
    }

    if (expense.report_id) {
      return { error: 'Este gasto ya ha sido incluido en un reporte financiero y no puede ser eliminado.' };
    }

    await expense.destroy();
    return { message: 'Gasto eliminado correctamente.' };

  } catch (error) {
    console.error(`Error al eliminar el gasto con ID ${id}:`, error);
    return { error: 'Ocurrió un error inesperado al eliminar el gasto.' };
  }
};

export default serviceDeleteGeneralExpense;