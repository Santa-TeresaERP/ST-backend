import { CashSessionAttributes } from '@type/ventas/cashSession'
import { z } from 'zod'

const cashSessionSchema = z.object({
  // El user_id no es necesario en la entrada del frontend, ya que se obtiene del token
  user_id: z
    .string({
      invalid_type_error: 'El ID del usuario debe ser un string UUID',
    })
    .uuid('El ID del usuario debe ser un UUID válido')
    .optional(),

  store_id: z
    .string({
      required_error: 'El ID de la tienda es obligatorio',
      invalid_type_error: 'El ID de la tienda debe ser un string UUID',
    })
    .uuid('El ID de la tienda debe ser un UUID válido'),

  start_amount: z
    .number({
      invalid_type_error: 'El monto inicial debe ser un número',
    })
    .nonnegative('El monto inicial no puede ser negativo')
    .optional(), // Opcional porque se puede obtener del end_amount de la sesión anterior

  end_amount: z
    .number({
      invalid_type_error: 'El monto final debe ser un número',
    })
    .nonnegative('El monto final no puede ser negativo')
    .optional(), // Opcional inicialmente, solo requerido al cerrar

  total_sales: z
    .number({
      invalid_type_error: 'El total de ventas debe ser un número',
    })
    .nonnegative('El total de ventas no puede ser negativo')
    .optional(), // Opcional inicialmente, solo requerido al cerrar
  total_returns: z
    .number({
      invalid_type_error: 'El total de devoluciones debe ser un número',
    })
    .nonnegative('El total de devoluciones no puede ser negativo')
    .optional(), // Opcional inicialmente, solo requerido al cerrar

  started_at: z.preprocess(
    (val) =>
      typeof val === 'string' || val instanceof Date ? new Date(val) : val,
    z.date().optional(),
  ),

  ended_at: z.preprocess(
    (val) =>
      typeof val === 'string' || val instanceof Date ? new Date(val) : val,
    z.date().optional(),
  ),

  status: z
    .enum(['open', 'closed'], {
      invalid_type_error: 'El estado debe ser "open" o "closed"',
    })
    .optional(), // Opcional porque se asigna por defecto como "open" al crear
})

// Para creación de sesión de caja
export const createCashSessionSchema = cashSessionSchema.pick({
  store_id: true,
  start_amount: true,
})

// Para cerrar una sesión de caja
export const closeCashSessionSchema = cashSessionSchema.pick({
  ended_at: true,
  status: true,
})

// Validación general
export const cashSessionValidation = (data: Partial<CashSessionAttributes>) =>
  cashSessionSchema.safeParse(data)
