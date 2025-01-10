import { z } from 'zod'
import { WarehouseAttributes } from '@type/warehouse.d'

const warehouseSchema = z.object({
  product_id: z
    .string()
    .uuid('El ID del producto debe ser un UUID válido')
    .nonempty('El ID del producto no puede estar vacío'),

  quantity: z
    .number({ invalid_type_error: 'La cantidad debe ser un número' })
    .int('La cantidad debe ser un número entero')
    .nonnegative('La cantidad no puede ser negativa'),

  inventory_adjustment_id: z
    .string()
    .uuid('El ID del ajuste de inventario debe ser un UUID válido')
    .optional(),

  observations: z
    .string()
    .max(150, 'Las observaciones no deben exceder los 150 caracteres')
    .optional(),

  created_at: z
    .string()
    .refine(
      (date) => !isNaN(Date.parse(date)),
      'La fecha de creación debe ser válida',
    )
    .optional(),
})

export const warehouseValidation = (data: WarehouseAttributes) =>
  warehouseSchema.safeParse(data)
