import { RentalAttributes } from '@type/alquiler/rentals'
import { z } from 'zod'

const RentalSchema = z.object({
  customer_id: z.string().uuid({
    message: 'El ID del cliente debe ser un UUID válido',
  }),

  place_id: z.string().uuid({
    message: 'El ID del lugar debe ser un UUID válido',
  }),

  user_id: z.string().uuid({
    message: 'El ID del usuario debe ser un UUID válido',
  }),

  start_date: z.date({
    invalid_type_error: 'La fecha de inicio debe ser una fecha válida',
  }),

  end_date: z.date({
    invalid_type_error: 'La fecha de fin debe ser una fecha válida',
  }),
})

export const rentalValidation = (data: RentalAttributes) =>
  RentalSchema.safeParse(data)
