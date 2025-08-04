import GeneralExpense from '@models/generalExpense';
import Module from '@models/modules'; // Para incluir el nombre del módulo

/**
 * Obtiene todos los registros de gastos.
 * Incluye el nombre del módulo que originó el gasto.
 * Ordena los gastos por fecha descendente.
 */
const serviceGetAllGeneralExpenses = async () => {
  try {
    const expenses = await GeneralExpense.findAll({
      include: [{
        model: Module,
        as: 'module',
        attributes: ['name'] // Solo traemos el nombre para eficiencia
      }],
      order: [['date', 'DESC']],
    });
    return expenses;
  } catch (error) {
    console.error('Error al obtener los gastos:', error);
    return { error: 'Ocurrió un error inesperado al obtener los gastos.' };
  }
};

export default serviceGetAllGeneralExpenses;