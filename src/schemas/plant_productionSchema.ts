import { z } from 'zod'
import { plant_productionAttributes } from '@type/plant_production'

const plantProductionSchema = z.object({
  id: z.string().uuid('El ID de la planta debe ser un UUID válido'),

  plant_name: z
    .string()
    .min(1, 'El nombre de la planta no puede estar vacío')
    .max(100, 'El nombre de la planta no debe exceder los 100 caracteres'),

  address: z.date().refine((date) => !isNaN(date.getTime()), {
    message: 'La dirección debe ser una fecha válida',
  }),
})

export const plantProductionValidation = (data: plant_productionAttributes) =>
  plantProductionSchema.safeParse(data)
