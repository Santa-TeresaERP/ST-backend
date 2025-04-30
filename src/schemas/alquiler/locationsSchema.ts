import { LocationAttributes } from '@type/alquiler/locations'
import { z } from 'zod'

const LocationSchema = z.object({
  id: z.string().uuid().optional(),

  name: z
    .string()
    .min(1, 'El nombre es obligatorio')
    .max(100, 'El nombre no puede superar los 100 caracteres'),

  address: z
    .string()
    .min(1, 'La dirección es obligatoria')
    .max(200, 'La dirección no puede superar los 200 caracteres'),

  capacity: z
    .number({ invalid_type_error: 'La capacidad debe ser un número' })
    .int('La capacidad debe ser un número entero')
    .nonnegative('La capacidad no puede ser negativa'),

  status: z
    .string()
    .min(1, 'El estado es obligatorio')
    .max(50, 'El estado no puede superar los 50 caracteres'),
})

export const locationValidation = (data: LocationAttributes) =>
  LocationSchema.safeParse(data)
