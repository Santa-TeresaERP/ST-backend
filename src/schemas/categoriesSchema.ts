import { CategoryAttributes } from '@type/modules'
import { z } from 'zod'

const categoriesSchema = z.object({
  name: z
    .string()
    .max(50, 'El nombre de la categoría no debe exceder los 50 caracteres')
    .regex(
      /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
      'El nombre de la categoría solo debe contener letras y espacios',
    )
    .min(1, 'El nombre de la categoría es obligatorio'), // Agregado para que no sea vacío

  description: z
    .string()
    .max(150, 'La descripción no debe exceder los 150 caracteres')
    .optional()
    .default(''),
})

export const categoriesValidation = (data: CategoryAttributes) =>
  categoriesSchema.safeParse(data)
