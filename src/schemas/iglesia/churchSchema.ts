import { z } from 'zod'
import { ChurchAttributes } from '@type/iglesia/church'

const churchSchema = z.object({
  id: z.string().uuid().optional(),

  name: z
    .string()
    .max(100, 'El nombre no debe exceder los 100 caracteres')
    .min(1, 'El nombre es requerido'),

  location: z
    .string()
    .max(150, 'La ubicación no debe exceder los 150 caracteres')
    .min(1, 'La ubicación es requerida'),

  state: z.boolean().default(true),

  status: z.boolean().default(true),

  createdAt: z
    .date()
    .optional()
    .refine((date) => date !== undefined && !isNaN(date.getTime()), {
      message: 'La fecha de creación debe ser válida',
    }),

  updatedAt: z
    .date()
    .optional()
    .refine((date) => date !== undefined && !isNaN(date.getTime()), {
      message: 'La fecha de actualización debe ser válida',
    }),
})

export const churchValidation = (data: ChurchAttributes) =>
  churchSchema.safeParse(data)

export const churchValidationPartial = (data: Partial<ChurchAttributes>) =>
  churchSchema.partial().safeParse(data)

export default churchSchema
