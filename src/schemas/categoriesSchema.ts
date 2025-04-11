import { CategoryAttributes } from '@type/categories'
import { z } from 'zod'

const categoriesSchema = z.object({
  name: z
    .string()
    .max(50, 'El nombre de la categoría no debe exceder los 50 caracteres')
    .regex(
      /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
      'El nombre de la categoría solo debe contener letras y espacios',
    )
    .min(1, 'El nombre de la categoría es obligatorio')
    .refine(
      (val) => !/^\s|\s$/.test(val),
      'El nombre no debe comenzar ni terminar con espacios en blanco',
    ),

  description: z
    .string()
    .max(150, 'La descripción no debe exceder los 150 caracteres')
    .optional()
    .default('')
    .refine(
      (val) => !/<script|<\/script|SELECT|DROP|INSERT|--/i.test(val),
      'La descripción contiene caracteres no permitidos o posibles inyecciones',
    ),
})

export const categoriesValidation = (data: CategoryAttributes) =>
  categoriesSchema.safeParse(data)
