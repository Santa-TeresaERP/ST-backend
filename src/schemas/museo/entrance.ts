import { z } from 'zod'
import { entranceAttributes } from '@type/museo/entrance'

export const entranceSchema = z.object({
  user_id: z.string().uuid('El ID del usuario debe ser un UUID válido'),

  type_person_id: z
    .string()
    .uuid('El ID del tipo de persona debe ser un UUID válido'),

  sale_date: z.string().min(1, 'La fecha de venta es obligatoria'),

  sale_number: z.string().min(1, 'El número de venta es obligatorio'),

  sale_channel: z.string().min(1, 'El canal de venta es obligatorio'),

  total_sale: z
    .number({ invalid_type_error: 'El total de la venta debe ser un número' })
    .nonnegative('El total de la venta no puede ser negativo'),

  payment_method: z.string().min(1, 'El método de pago es obligatorio'),

  free: z.boolean({ invalid_type_error: 'El campo "free" debe ser booleano' }),
})

export const entranceValidation = (data: entranceAttributes) =>
  entranceSchema.safeParse(data)
