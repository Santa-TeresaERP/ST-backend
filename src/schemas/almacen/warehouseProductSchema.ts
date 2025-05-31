import { z } from 'zod'
import { WarehouseProductAttributes } from '@type/almacen/warehouse_product'

export const warehouseProductSchema = z.object({
  id: z
    .string()
    .uuid('El ID del producto de almacén debe ser un UUID válido')
    .nonempty('El ID del producto de almacén no puede estar vacío'),

  warehouse_id: z
    .string()
    .uuid('El ID del almacén debe ser un UUID válido')
    .nonempty('El ID del almacén no puede estar vacío'),

  product_id: z
    .string()
    .uuid('El ID del producto debe ser un UUID válido')
    .nonempty('El ID del producto no puede estar vacío'),

  quantity: z
    .number({ invalid_type_error: 'La cantidad debe ser un número' })
    .nonnegative('La cantidad no puede ser negativa'),

  entry_date: z.coerce.date({
    invalid_type_error: 'La fecha de entrada debe ser válida',
  }),

  createdAt: z
    .date({
      invalid_type_error: 'La fecha de creación debe ser una fecha válida',
    })
    .optional(),

  updatedAt: z
    .date({
      invalid_type_error: 'La fecha de actualización debe ser una fecha válida',
    })
    .optional(),
})

// Validación segura
export const warehouseProductValidation = (data: WarehouseProductAttributes) =>
  warehouseProductSchema.safeParse(data)
