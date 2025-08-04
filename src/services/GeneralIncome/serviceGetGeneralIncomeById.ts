import GeneralIncome from '@models/generalIncome';
import Module from '@models/modules';

/**
 * Obtiene un ingreso específico por su ID.
 * Incluye el nombre del módulo asociado.
 */
const serviceGetGeneralIncomeById = async (id: string) => {
  try {
    const income = await GeneralIncome.findByPk(id, {
      include: [{
        model: Module,
        as: 'module',
        attributes: ['name']
      }],
    });

    if (!income) {
      return { error: 'Ingreso no encontrado.' };
    }

    return income;
  } catch (error) {
    console.error(`Error al obtener el ingreso con ID ${id}:`, error);
    return { error: 'Ocurrió un error inesperado al obtener el ingreso.' };
  }
};

export default serviceGetGeneralIncomeById;