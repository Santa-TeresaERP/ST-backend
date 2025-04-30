import { salesAttributes } from '@type/ventas/sale'
import { z } from 'zod'

// Definir el esquema de ventas, si salesAtributes es un tipo, necesitas crear el esquema de validación correspondiente.
const salesSchema = z.object({
  id: z.string().uuid('El ID debe ser un UUID válido'),

  userId: z.string().uuid('El ID de usuario debe ser un UUID válido'),

  total: z
    .number()
    .positive('El total debe ser un número positivo')
    .refine(
      (val) => val.toString().length === 9,
      'El número debe tener exactamente 9 dígitos',
    ),

  observations: z
    .string()
    .nullable()
    .refine((val) => {
      if (val && /<script|<\/script|SELECT|DROP|INSERT|--/i.test(val)) {
        return false
      }
      return true
    }, 'Observaciones contienen caracteres no permitidos o posibles inyecciones'),

  createdAt: z
    .date()
    .refine((date) => date <= new Date(), 'La fecha no puede ser futura'),
})

export const saleValidation = (data: salesAttributes) =>
  salesSchema.safeParse(data)
