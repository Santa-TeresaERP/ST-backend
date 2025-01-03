import { UserAttributes } from '@type/auth'
import { z } from 'zod'

const userSchema = z.object({
  name: z
    .string()
    .max(45, 'El nombre completo no debe exceder los 45 caracteres')
    .regex(
      /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
      'El nombre solo debe contener letras y espacios',
    ),

  dni: z
    .string()
    .length(8, 'El DNI debe tener 8 dígitos')
    .regex(/^[0-9]+$/, 'El DNI solo debe contener números'),

  phonenumber: z
    .string()
    .length(9, 'El número telefónico debe tener 9 dígitos')
    .regex(/^[0-9]+$/, 'El número telefónico solo debe contener números'),

  email: z.string().email('El email debe tener un formato válido'),

  roleId: z.string().nonempty('El rol no puede estar vacío'),

  password: z
    .string()
    .min(5, 'La contraseña debe tener al menos 5 caracteres')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d_-]+$/,
      'La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y solo los caracteres "_" o "-" permitidos',
    ),

  status: z
    .string()
    .regex(/^[A-Za-z]+$/, 'El estado solo debe contener letras')
    .nonempty('El estado no puede estar vacío'),

  createdA: z.date().optional(),
  updatedAt: z.date().optional(),
})

export const userValidation = (data: UserAttributes) =>
  userSchema.safeParse(data)

export const userValidationPartial = (data: UserAttributes) =>
  userSchema.partial().safeParse(data)
