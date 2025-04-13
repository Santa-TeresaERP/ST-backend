import { ModuleAttributes } from '@type/user/modules'
import { z } from 'zod'

const modulesSchema = z.object({
  name: z
    .string()
    .nonempty('El nombre del módulo no puede estar vacío')
    .max(25, 'El nombre del módulo no debe exceder los 25 caracteres')
    .regex(
      /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
      'El nombre del módulo solo debe contener letras y espacios',
    )
    .refine(
      (val) => val.trim() !== '',
      'El nombre no puede ser solo espacios vacíos',
    ),

  description: z
    .string()
    .max(100, 'La descripción del módulo no debe exceder los 100 caracteres')
    .regex(
      /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]*$/,
      'La descripción del módulo solo debe contener letras y espacios',
    )
    .optional()
    .refine(
      (val) => val === undefined || val.trim() === '' || val.trim().length > 0,
      'La descripción no puede contener solo espacios vacíos',
    ),
})

export const modulesValidation = (data: ModuleAttributes) =>
  modulesSchema.safeParse(data)
