// src/services/Iglesia/serviceCreateIncomeChurch.ts

import IncomeChurch from '@models/IncomeChurch'
import { IncomeChurchAttributes } from '../../types/iglesia/income_church'

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
    // Validaciones
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

    // Crear el nuevo ingreso
    const newIncome = await IncomeChurch.create({
      ...data,
      idChurch: churchId,
      status: true,
      date: data.date ?? new Date().toISOString(),
    } as IncomeChurchAttributes) // <-- 🔒 Forzamos el tipo ya validado

    return {
      success: true,
      message: 'Ingreso de la iglesia creado exitosamente.',
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
