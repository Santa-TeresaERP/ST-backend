import { z } from 'zod'
import { RentChurchAttributes } from '@type/iglesia/rentChurch'

const rentChurchSchema = z.object({
  id: z.string().uuid().optional(),

  name: z
    .string()
    .max(100, 'El nombre no debe exceder los 100 caracteres')
    .min(1, 'El nombre es requerido'),

  type: z.enum(['matrimonio', 'bautizo', 'otros']),

  startTime: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'El formato de hora debe ser HH:MM'),

  endTime: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'El formato de hora debe ser HH:MM'),

  price: z.number().nonnegative('El precio no puede ser negativo'),

  status: z.boolean().default(true),

  date: z.string().refine((s) => !isNaN(Date.parse(s)), {
    message: 'La fecha debe ser válida',
  }),

  idChurch: z.string().uuid().nullable().optional(),

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

export const rentChurchValidation = (data: RentChurchAttributes) =>
  rentChurchSchema.safeParse(data)

export const rentChurchValidationPartial = (
  data: Partial<RentChurchAttributes>,
) => rentChurchSchema.partial().safeParse(data)

export default rentChurchSchema
