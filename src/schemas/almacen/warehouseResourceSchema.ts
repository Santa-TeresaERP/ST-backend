import { z } from 'zod'
import { WarehouseResourceAttributes } from '@type/almacen/warehouse_resource'

export const warehouseResourceSchema = z.object({
  id: z
    .string()
    .uuid('El ID del recurso de almacén debe ser un UUID válido')
    .nonempty('El ID del recurso de almacén no puede estar vacío'),

  warehouse_id: z
    .string()
    .uuid('El ID del almacén debe ser un UUID válido')
    .nonempty('El ID del almacén no puede estar vacío'),

  resource_id: z
    .string()
    .uuid('El ID del almacén debe ser un UUID válido')
    .nonempty('El ID del almacén no puede estar vacío'),

  quantity: z.number({ invalid_type_error: 'La cantidad debe ser un número' }),

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
export const warehouseResourceValidation = (
  data: WarehouseResourceAttributes,
) => warehouseResourceSchema.safeParse(data)
