// src/services/Iglesia/serviceGetIncomeById.ts

import IncomeChurch from '@models/IncomeChurch'

/**
 * Obtiene un ingreso de la iglesia por su ID.
 * Similar en estructura a los servicios tipo "GetAll" y "Delete".
 * @param incomeId ID del ingreso a buscar.
 */
const serviceGetIncomeById = async (incomeId: string) => {
  try {
    // Buscar el ingreso por su clave primaria
    const income = await IncomeChurch.findByPk(incomeId)

    // Validar si existe
    if (!income) {
      return {
        success: false,
        error: `Ingreso con ID ${incomeId} no encontrado.`,
      }
    }

    // Retornar el ingreso encontrado
    return {
      success: true,
      message: `Ingreso con ID ${incomeId} encontrado exitosamente.`,
      income,
    }
  } catch (error) {
    console.error(`Error al obtener el ingreso con ID ${incomeId}:`, error)

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'Error al obtener el ingreso por ID.',
    }
  }
}

export default serviceGetIncomeById
