import { z } from 'zod'
import { ResourceAttributes } from '@type/almacen/resource'

export const resourceSchema = z.object({
  name: z
    .string()
    .min(1, 'El nombre del recurso es obligatorio')
    .max(100, 'El nombre del recurso no debe exceder los 100 caracteres'),

  observation: z
    .string()
    .max(150, 'La observación no debe exceder los 150 caracteres')
    .optional(),
  status: z.boolean().optional(),
})

export const resourceValidation = (data: ResourceAttributes) =>
  resourceSchema.safeParse(data)
