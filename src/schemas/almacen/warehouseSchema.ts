import { z } from 'zod'
import { WarehouseAttributes } from '@type/almacen/warehouse'

export const warehouseSchema = z.object({
  name: z
    .string()
    .min(1, 'El nombre es obligatorio')
    .max(100, 'El nombre no debe exceder los 100 caracteres'),

  location: z
    .string()
    .min(1, 'La ubicación es obligatoria')
    .max(150, 'La ubicación no debe exceder los 150 caracteres'),

  capacity: z
    .number({ invalid_type_error: 'La capacidad debe ser un número' })
    .int('La capacidad debe ser un número entero')
    .nonnegative('La capacidad no puede ser negativa'),

  observation: z
    .string()
    .max(150, 'La observación no debe exceder los 150 caracteres')
    .optional(),

  status: z.boolean().optional(),
})
// Validación de estado activo/inactivo
export const validateWarehouseStatus = (data: { status?: boolean }) => {
  // Comprobamos explícitamente si el estado es 'false'.
  if (data.status === false) {
    return {
      success: false,
      error: 'El almacén está inactivo y no se pueden realizar movimientos.',
    }
  }
  // Si el estado es 'true' o no está definido, consideramos que es válido.
  return { success: true }
}

// Validación segura
export const warehouseValidation = (data: WarehouseAttributes) =>
  warehouseSchema.safeParse(data)
