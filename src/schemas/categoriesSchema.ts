import { z } from 'zod'
import { CategoryAttributes } from '@type/categories'

const categorySchema = z.object({
  category_id: z.string().uuid('El ID de la categoría debe ser un UUID válido'),

  name: z
    .string()
    .min(1, 'El nombre no puede estar vacío')
    .max(100, 'El nombre no debe exceder los 100 caracteres'),

  description: z
    .string()
    .max(255, 'La descripción no debe exceder los 255 caracteres'),

  createdAt: z
    .date({
      invalid_type_error: 'La fecha de creación debe ser válida',
    })
    .optional(),

  updatedAt: z
    .date({
      invalid_type_error: 'La fecha de actualización debe ser válida',
    })
    .optional(),
})

export const categoryValidation = (data: CategoryAttributes) =>
  categorySchema.safeParse(data)
