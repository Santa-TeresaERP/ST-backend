import GeneralIncome from '@models/generalIncome';
import { GeneralIncomeAttributes } from '@type/finanzas/generalIncome';
import { updateGeneralIncomeValidation } from 'src/schemas/finanzas/generalIncomeSchema';

/**
 * Actualiza un registro de ingreso existente.
 * No permite la modificación si el ingreso ya está asociado a un reporte financiero.
 */
const serviceUpdateGeneralIncome = async (id: string, body: Partial<GeneralIncomeAttributes>) => {
  const validation = updateGeneralIncomeValidation(body);
  if (!validation.success) {
    return { error: JSON.stringify(validation.error.issues) };
  }

  try {
    const income = await GeneralIncome.findByPk(id);
    if (!income) {
      return { error: 'Ingreso no encontrado.' };
    }

    // Regla de negocio: no se puede editar un ingreso que ya está en un reporte.
    if (income.report_id) {
      return { error: 'Este ingreso ya ha sido incluido en un reporte financiero y no puede ser modificado.' };
    }

    await income.update(body);
    return income;

  } catch (error) {
    console.error(`Error al actualizar el ingreso con ID ${id}:`, error);
    return { error: 'Ocurrió un error inesperado al actualizar el ingreso.' };
  }
};

export default serviceUpdateGeneralIncome;