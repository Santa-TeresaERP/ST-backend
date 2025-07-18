import { CashSessionAttributes } from '@type/ventas/cashSession'
import { z } from 'zod'

const cashSessionSchema = z.object({
  user_id: z
    .string({
      required_error: 'El ID del usuario es obligatorio',
      invalid_type_error: 'El ID del usuario debe ser un string UUID',
    })
    .uuid('El ID del usuario debe ser un UUID válido'),

  store_id: z
    .string({
      required_error: 'El ID de la tienda es obligatorio',
      invalid_type_error: 'El ID de la tienda debe ser un string UUID',
    })
    .uuid('El ID de la tienda debe ser un UUID válido'),

  start_amount: z
    .number({
      required_error: 'El monto inicial es obligatorio',
      invalid_type_error: 'El monto inicial debe ser un número',
    })
    .nonnegative('El monto inicial no puede ser negativo'),

  end_amount: z
    .number({
      required_error: 'El monto final es obligatorio',
      invalid_type_error: 'El monto final debe ser un número',
    })
    .nonnegative('El monto final no puede ser negativo'),

  total_returns: z
    .number({
      required_error: 'El total de devoluciones es obligatorio',
      invalid_type_error: 'El total de devoluciones debe ser un número',
    })
    .nonnegative('El total de devoluciones no puede ser negativo'),

  ended_at: z.preprocess(
    (val) =>
      typeof val === 'string' || val instanceof Date ? new Date(val) : val,
    z.date({ required_error: 'La fecha de cierre es obligatoria' }),
  ),
})

export const cashSessionValidation = (data: CashSessionAttributes) =>
  cashSessionSchema.safeParse(data)
