import { CustomerAttributes } from '@type/alquiler/customers'
import { z } from 'zod'

const CustomerSchema = z.object({
  id: z.string().uuid().optional(),

  full_name: z
    .string()
    .min(1, 'El nombre completo es obligatorio')
    .max(100, 'El nombre completo no puede superar los 100 caracteres'),

  dni: z
    .number({ invalid_type_error: 'El DNI debe ser un número' })
    .int('El DNI debe ser un número entero'),

  phone: z
    .string()
    .regex(/^\+?[0-9\s-]{11}$/, 'El número de teléfono no es válido'),

  email: z.string().email('Debe ser un correo electrónico válido'),
})

export const customerValidation = (data: CustomerAttributes) =>
  CustomerSchema.safeParse(data)
