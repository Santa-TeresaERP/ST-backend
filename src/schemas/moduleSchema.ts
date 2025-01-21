import { ModuleAttributes } from '@type/module'
import { z } from 'zod'

const modulesSchema = z.object({
  name: z
    .string()
    .max(25, 'El nombre del módulo no debe exceder los 25 caracteres')
    .regex(
      /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
      'El nombre del módulo solo debe contener letras y espacios',
    ),

  description: z
    .string()
    .max(100, 'La descripción del módulo no debe exceder los 100 caracteres')
    .regex(
      /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
      'La descripción del módulo solo debe contener letras y espacios',
    )
    .optional(),
})

export const modulesValidation = (data: ModuleAttributes) =>
  modulesSchema.safeParse(data)
