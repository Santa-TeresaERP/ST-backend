import { z } from 'zod'
import { buysResourceAttributes } from '@type/almacen/buys_resource'

export const buysResourceSchema = z.object({
  warehouse_id: z
    .string()
    .uuid('El ID del almacén debe ser un UUID válido')
    .nonempty('El ID del almacén no puede estar vacío'),

  resource_id: z
    .string()
    .uuid('El ID del recurso debe ser un UUID válido')
    .nonempty('El ID del recurso no puede estar vacío'),

  quantity: z.number({ invalid_type_error: 'La cantidad debe ser un número' }),

  type_unit: z
    .string()
    .nonempty('El tipo de unidad no puede estar vacío')
    .max(50, 'El tipo de unidad no puede exceder los 50 caracteres'),

  unit_price: z.number({
    invalid_type_error: 'El precio unitario debe ser un número',
  }),

  total_cost: z.number({
    invalid_type_error: 'El costo total debe ser un número',
  }),

  supplier_id: z.string().uuid('El ID del proveedor debe ser un UUID válido'),

  entry_date: z.coerce.date({
    invalid_type_error: 'La fecha de entrada debe ser válida',
  }),
})

export const buysResourceValidation = (data: buysResourceAttributes) =>
  buysResourceSchema.safeParse(data)
