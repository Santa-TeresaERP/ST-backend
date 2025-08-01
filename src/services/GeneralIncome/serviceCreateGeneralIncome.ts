import GeneralIncome from '@models/generalIncome';
import { GeneralIncomeAttributes } from '@type/finanzas/generalIncome';
import { createGeneralIncomeValidation } from 'src/schemas/finanzas/generalIncomeSchema';
import Module from '@models/modules'; // Importamos Module para verificar su existencia

const serviceCreateGeneralIncome = async (body: GeneralIncomeAttributes) => {
  // 1. Validar los datos de entrada
  const validation = createGeneralIncomeValidation(body);
  if (!validation.success) {
    return { error: JSON.stringify(validation.error.issues) };
  }

  const { module_id, income_type, amount, date, description } = validation.data;

  try {
    // 2. (Opcional pero recomendado) Verificar que el módulo asociado existe
    const moduleExists = await Module.findByPk(module_id);
    if (!moduleExists) {
      return { error: `El módulo con ID ${module_id} no existe.` };
    }

    // 3. Crear el nuevo registro de ingreso
    const newIncome = await GeneralIncome.create({
      module_id,
      income_type,
      amount,
      date,
      description,
      // report_id se deja como null por defecto, listo para ser incluido en un futuro reporte
    });

    return newIncome;
  } catch (error) {
    console.error('Error al crear el ingreso general:', error);
    return { error: 'Ocurrió un error inesperado al crear el ingreso.' };
  }
};

export default serviceCreateGeneralIncome;