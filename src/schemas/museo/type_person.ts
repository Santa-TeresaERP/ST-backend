import { z } from 'zod'
import { typePersonAttributes } from '@type/museo/type_person'

export const typePersonSchema = z.object({
  name: z
    .string()
    .min(1, 'El nombre del tipo de persona es obligatorio')
    .max(100, 'El nombre no debe exceder los 100 caracteres'),

  base_price: z
    .number({ invalid_type_error: 'El precio base debe ser un número' })
    .nonnegative('El precio base no puede ser negativo'),
})

export const typePersonValidation = (data: typePersonAttributes) =>
  typePersonSchema.safeParse(data)
