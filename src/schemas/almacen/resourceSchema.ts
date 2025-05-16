import { z } from 'zod'
import { ResourceAttributes } from '@type/almacen/resource'

export const resourceSchema = z.object({
  name: z
    .string()
    .min(1, 'El nombre del recurso es obligatorio')
    .max(100, 'El nombre del recurso no debe exceder los 100 caracteres'),

  entry_quantity: z
    .number({ invalid_type_error: 'La cantidad de entrada debe ser un número' })
    .positive('La cantidad de entrada debe ser mayor que cero')
    .int('La cantidad de entrada debe ser un número entero'),

  total_cost: z
    .number({ invalid_type_error: 'El costo total debe ser un número' })
    .positive('El costo total debe ser mayor que cero'),

  type_unit: z.enum(['g', 'kg', 'ml', 'l', 'unidades'], {
    invalid_type_error:
      'El tipo de unidad debe ser uno de: g, kg, ml, l, unidades',
  }),

  supplier_id: z
    .string()
    .uuid('El ID del proveedor debe ser un UUID válido')
    .nonempty('El ID del proveedor no puede estar vacío'),

  purchase_date: z.coerce.date({
    invalid_type_error: 'La fecha de compra debe ser válida',
  }),

  observation: z
    .string()
    .max(150, 'La observación no debe exceder los 150 caracteres')
    .optional(),
})

// Validación segura
export const resourceValidation = (data: ResourceAttributes) =>
  resourceSchema.safeParse(data)
