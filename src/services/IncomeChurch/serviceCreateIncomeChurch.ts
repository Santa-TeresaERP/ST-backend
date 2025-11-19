import IncomeChurch from '@models/IncomeChurch'
import { IncomeChurchAttributes } from '../../types/church/income_church'

// 👇 Importamos la función de sincronización con General Income
import createChurchIncome from '@services/GeneralIncome/CollentionFunc/Church/ChurchIcome'

/**
 * Crea un nuevo ingreso para una iglesia.
 * @param data Datos parciales del ingreso.
 * @param churchId ID de la iglesia a la que pertenece el ingreso.
 * @returns Resultado con éxito o error.
 */
const serviceCreateIncomeChurch = async (
  data: Partial<IncomeChurch>,
  churchId: string,
) => {
  try {
    // --- Validaciones ---
    if (!churchId) {
      return {
        success: false,
        error: 'idChurch es requerido para crear un ingreso de la iglesia.',
      }
    }

    if (data.price === undefined || data.price === null || data.price <= 0) {
      return {
        success: false,
        error: 'El monto (price) es requerido y debe ser positivo.',
      }
    }

    if (!data.name || data.name.trim() === '') {
      return {
        success: false,
        error: 'El nombre del ingreso es requerido.',
      }
    }

    if (!data.type || data.type.trim() === '') {
      return {
        success: false,
        error: 'El tipo de ingreso es requerido.',
      }
    }

    // 1) Crear el nuevo ingreso en la tabla específica (INCOME_CHURCH)
    const newIncome = await IncomeChurch.create({
      ...data,
      idChurch: churchId,
      status: true,
      date: data.date ?? new Date().toISOString(),
    } as IncomeChurchAttributes)

    // 2) Registrar el ingreso en la tabla global (GENERAL_INCOMES)
    // Usamos .get({ plain: true }) para obtener el objeto JSON limpio de Sequelize
    await createChurchIncome(
      newIncome.get({ plain: true }) as IncomeChurchAttributes,
    )

    return {
      success: true,
      message:
        'Ingreso de la iglesia creado exitosamente y registrado en contabilidad.',
      income: newIncome,
    }
  } catch (error) {
    console.error('Error al crear el ingreso de la iglesia:', error)
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'Error al crear el ingreso de la iglesia.',
    }
  }
}

export default serviceCreateIncomeChurch
