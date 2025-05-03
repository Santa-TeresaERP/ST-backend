import { CategoryAttributes } from '@type/production/categories'
import { z } from 'zod'

const categorySchema = z.object({
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
