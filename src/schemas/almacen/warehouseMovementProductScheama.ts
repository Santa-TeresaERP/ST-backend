import { z } from 'zod'
import { WarehouseMovomentProductAttributes } from '@type/almacen/warehouse_movement_product'

export const warehouseMovementProductSchema = z.object({
  warehouse_id: z
    .string()
    .uuid('El ID del almacén debe ser un UUID válido')
    .nonempty('El ID del almacén no puede estar vacío'),

  store_id: z.string().uuid().optional().nullable(),
  product_id: z
    .string()
    .uuid('El ID del producto debe ser un UUID válido')
    .nonempty('El ID del producto no puede estar vacío'),

  movement_type: z.enum(['salida', 'entrada'], {
    errorMap: () => ({
      message: 'El tipo de movimiento debe ser "salida" o "entrada"',
    }),
  }),

  quantity: z
    .number({ invalid_type_error: 'La cantidad debe ser un número' })
    .nonnegative('La cantidad no puede ser negativa'),

  movement_date: z.coerce.date({
    invalid_type_error: 'La fecha del movimiento debe ser válida',
  }),

  observations: z
    .string()
    .max(150, 'Las observaciones no deben exceder los 150 caracteres')
    .optional(),
})

export const warehouseMovementProductValidation = (
  data: WarehouseMovomentProductAttributes,
) => warehouseMovementProductSchema.safeParse(data)
