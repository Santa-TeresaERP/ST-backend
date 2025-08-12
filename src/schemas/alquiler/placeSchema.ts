import { PlaceAttributes } from '@type/alquiler/places'
import { z } from 'zod'

const PlaceSchema = z.object({
  location_id: z.string().uuid({
    message: 'El ID de la ubicación debe ser un UUID válido',
  }),

  name: z
    .string()
    .min(1, 'El nombre es obligatorio')
    .max(100, 'El nombre no puede superar los 100 caracteres'),

  area: z
    .string()
    .min(1, 'El área es obligatoria')
    .max(100, 'El área no puede superar los 100 caracteres'),

  imagen_url: z
    .string()
    .url('La URL de la imagen debe ser válida')
    .max(2048, 'La URL de la imagen no puede superar los 2048 caracteres')
    .optional(),
})

export const placeValidation = (data: PlaceAttributes) =>
  PlaceSchema.safeParse(data)
