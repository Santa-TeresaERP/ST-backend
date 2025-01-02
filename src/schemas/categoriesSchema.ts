import { CategoryAttributes } from '@type/modules'
import { z } from 'zod'

const categoriesSchema = z.object({
  name: z
    .string()
    .max(50, 'El nombre de la categoría no debe exceder los 50 caracteres')
    .regex(
      /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
      'El nombre de la categoría solo debe contener letras y espacios',
    ),

  description: z
    .string()
    .max(150, 'La descripción no debe exceder los 150 caracteres')
    .optional(),
})

export const categoriesValidation = (data: CategoryAttributes) =>
  categoriesSchema.safeParse(data)
