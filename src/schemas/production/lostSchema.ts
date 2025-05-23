import { lostAttributes } from '@type/production/lost'
import { z } from 'zod'

const lostSchema = z.object({
  quantity: z
    .number()
    .int('La cantidad debe ser un número entero')
    .positive('La cantidad debe ser mayor que cero'),

  lost_type: z
    .string()
    .min(1, 'El tipo de pérdida no puede estar vacío')
    .max(50, 'El tipo de pérdida no debe exceder los 50 caracteres'),

  observations: z
    .string()
    .max(255, 'Las observaciones no deben exceder los 255 caracteres')
    .optional(), // opcional si lo defines así en la base de datos
})

export const lostValidation = (data: lostAttributes) =>
  lostSchema.safeParse(data)
