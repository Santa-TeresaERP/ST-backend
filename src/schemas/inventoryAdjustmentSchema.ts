import { z } from 'zod'
import { InventoryAdjustmentAttributes } from '@type/inventoryAdjustment.d'

const inventoryAdjustmentSchema = z.object({
  product_id: z
    .string()
    .uuid('El ID del producto debe ser un UUID válido')
    .nonempty('El ID del producto no puede estar vacío'),

  adjustment_type: z
    .string()
    .nonempty('El tipo de ajuste no puede estar vacío')
    .max(50, 'El tipo de ajuste no debe exceder los 50 caracteres')
    .regex(
      /^[a-zA-Z0-9\s]+$/,
      'El tipo de ajuste solo debe contener caracteres alfanuméricos y espacios',
    ),

  quantity: z
    .number({ invalid_type_error: 'La cantidad debe ser un número' })
    .int('La cantidad debe ser un número entero')
    .positive('La cantidad debe ser mayor a cero'),

  observations: z
    .string()
    .max(150, 'Las observaciones no deben exceder los 150 caracteres')
    .optional()
    .refine(
      (val) => !val || !/<script|<\/script|SELECT|DROP|INSERT|--/i.test(val),
      'Las observaciones contienen caracteres no permitidos o posibles inyecciones',
    ),

  created_at: z
    .date()
    .refine(
      (date) => date <= new Date(),
      'La fecha de creación no puede ser futura',
    )
    .optional(),
})

export const inventoryAdjustmentValidation = (
  data: InventoryAdjustmentAttributes,
) => inventoryAdjustmentSchema.safeParse(data)
