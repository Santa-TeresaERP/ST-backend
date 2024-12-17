import { UserAttributes } from '@type/auth'
import { z } from 'zod'

const userSchema = z.object({
  name: z
    .string()
    .max(45, 'El nombre no debe exceder los 45 caracteres')
    .regex(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, 'El nombre solo debe contener letras'),

  phonenumber: z
    .string()
    .length(9, 'El número telefónico debe tener 9 dígitos')
    .regex(/^[0-9]+$/, 'El número telefónico solo debe contener números'),

  dni: z
    .string()
    .length(8, 'El DNI debe tener 8 dígitos')
    .regex(/^[0-9]+$/, 'El DNI solo debe contener números'),

  email: z.string().email('El email debe tener un formato válido'),

  password: z
    .string()
    .min(5, 'La contraseña debe tener al menos 5 caracteres')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d_-]+$/,
      'La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y solo los caracteres "_" o "-" permitidos',
    ),

  isAdmin: z.boolean().optional(),
  enabled: z.boolean().optional(),
})
export const userValidation = (data: UserAttributes) =>
  userSchema.safeParse(data)
