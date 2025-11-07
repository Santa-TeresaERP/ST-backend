// src/services/Iglesia/serviceGetAllIncomes.ts

import IncomeChurch from '@models/IncomeChurch'

/**
 * Obtiene todos los ingresos de la iglesia (activos e inactivos).
 * Similar a serviceGetAllOverheads.
 */
const serviceGetAllIncomes = async () => {
  try {
    // Buscar todos los ingresos sin filtrar por estado
    const incomes = await IncomeChurch.findAll()

    // Si no hay registros
    if (!incomes || incomes.length === 0) {
      return {
        success: true,
        message: 'No se encontraron ingresos registrados.',
        incomes: [],
      }
    }

    // Si hay registros, devolvemos el resultado con un mensaje
    return {
      success: true,
      message: `${incomes.length} ingreso(s) encontrado(s).`,
      incomes,
    }
  } catch (error) {
    console.error('Error al obtener todos los ingresos:', error)

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'Error al obtener todos los ingresos.',
    }
  }
}

export default serviceGetAllIncomes
