import { returnsAttributes } from '@type/ventas/returns'
import { z } from 'zod'

export const returnSchema = z.object({
  id: z.string().uuid('El ID debe ser un UUID válido'),

  productId: z.string().uuid('El ID del producto debe ser un UUID válido'),

  salesId: z.string().uuid('El ID de la venta debe ser un UUID válido'),

  reason: z
    .string()
    .nullable()
    .refine((val) => {
      if (val && val.length > 255) {
        return false
      }
      return true
    }, 'La razón no puede exceder los 255 caracteres')
    .refine((val) => {
      if (val && /<script|<\/script|SELECT|DROP|INSERT|--/i.test(val)) {
        return false
      }
      return true
    }, 'La razón contiene caracteres no permitidos o posibles inyecciones'),

  observations: z
    .string()
    .nullable()
    .refine((val) => {
      if (val && val.length > 500) {
        return false
      }
      return true
    }, 'Las observaciones no pueden exceder los 500 caracteres')
    .refine((val) => {
      if (val && /<script|<\/script|SELECT|DROP|INSERT|--/i.test(val)) {
        return false
      }
      return true
    }, 'Las observaciones contienen caracteres no permitidos o posibles inyecciones'),

  createdAt: z
    .date()
    .optional()
    .refine(
      (date) => date === undefined || date <= new Date(),
      'La fecha no puede ser futura',
    ),
})

export const returnValidation = (data: returnsAttributes) =>
  returnSchema.safeParse(data)
