import { z } from 'zod'
import { ResourceAttributes } from '@type/almacen/resource'

export const resourceSchema = z.object({
  id: z.string().uuid('El ID del recurso debe ser un UUID válido').optional(),

  name: z
    .string()
    .min(1, 'El nombre del recurso es obligatorio')
    .max(100, 'El nombre del recurso no debe exceder los 100 caracteres'),

  unit_price: z.string().min(1, 'El precio unitario es obligatorio'),

  type_unit: z
    .string()
    .min(1, 'El tipo de unidad es obligatorio')
    .max(50, 'El tipo de unidad no debe exceder los 50 caracteres'),

  total_cost: z
    .number({ invalid_type_error: 'El costo total debe ser un número' })
    .positive('El costo total debe ser mayor que cero'),

  supplier_id: z
    .string()
    .uuid('El ID del proveedor debe ser un UUID válido')
    .nonempty('El ID del proveedor no puede estar vacío'),

  observation: z
    .string()
    .max(150, 'La observación no debe exceder los 150 caracteres')
    .nonempty('El ID del proveedor no puede estar vacío'),

  purchase_date: z.coerce.date({
    invalid_type_error: 'La fecha de compra debe ser válida',
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
export const resourceValidation = (data: ResourceAttributes) =>
  resourceSchema.safeParse(data)
