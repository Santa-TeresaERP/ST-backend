// src/services/Iglesia/serviceGetActiveIncomes.ts

import IncomeChurch from '@models/IncomeChurch'

/**
 * Obtiene todos los ingresos activos (status: true) de todas las iglesias.
 * Si deseas filtrarlo por iglesia específica, se puede agregar un parámetro churchId.
 * @returns Resultado con éxito o error.
 */
const serviceGetActiveIncomes = async () => {
  try {
    // Buscar todos los ingresos activos
    const activeIncomes = await IncomeChurch.findAll({
      where: { status: true },
    })

    if (!activeIncomes || activeIncomes.length === 0) {
      return {
        success: true,
        message: 'No se encontraron ingresos activos.',
        incomes: [],
      }
    }

    return {
      success: true,
      message: `${activeIncomes.length} ingreso(s) activo(s) encontrados.`,
      incomes: activeIncomes,
    }
  } catch (error) {
    console.error('Error al obtener los ingresos activos:', error)
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'Error al obtener los ingresos activos.',
    }
  }
}

export default serviceGetActiveIncomes
