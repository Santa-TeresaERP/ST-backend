import { RolesAttributes } from '@type/role'
import { z } from 'zod'

const rolesSchema = z.object({
  name: z
    .string()
    .max(25, 'El nombre del rol no debe exceder los 25 caracteres')
    .regex(
      /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
      'El nombre del rol solo debe contener letras y espacios',
    ),

  description: z
    .string()
    .max(100, 'La descripción del rol no debe exceder los 100 caracteres')
    .regex(
      /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
      'La descripción del rol solo debe contener letras y espacios',
    ),
})

export const rolesValidation = (data: RolesAttributes) =>
  rolesSchema.safeParse(data)
