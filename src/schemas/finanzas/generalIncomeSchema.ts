import { z } from 'zod'

/**
 * Schema para validar la CREACIÓN de un nuevo registro de ingreso.
 * Define todos los campos que el usuario debe proporcionar.
 */
export const createGeneralIncomeSchema = z.object({
  module_id: z
    .string()
    .uuid({ message: 'El ID del módulo debe ser un UUID válido.' }),
  income_type: z
    .string()
    .min(1, 'El tipo de ingreso es obligatorio.')
    .max(100, 'El tipo no debe exceder los 100 caracteres.'),
  amount: z
    .number({ invalid_type_error: 'El monto debe ser un número.' })
    .positive('El monto debe ser un número positivo.'),
  date: z.coerce.date({
    required_error: 'La fecha del ingreso es obligatoria.',
    invalid_type_error: 'La fecha debe ser una fecha válida.',
  }),
  description: z
    .string()
    .max(500, 'La descripción no puede exceder los 500 caracteres.')
    .optional()
    .nullable(),
})

/**
 * Schema para validar la ACTUALIZACIÓN de un registro de ingreso.
 * Usamos .partial() para indicar que todos los campos son opcionales durante una actualización.
 */
export const updateGeneralIncomeSchema = createGeneralIncomeSchema.partial()

// --- FUNCIONES DE VALIDACIÓN EXPORTADAS ---

export const createGeneralIncomeValidation = (data: unknown) => {
  return createGeneralIncomeSchema.safeParse(data)
}

export const updateGeneralIncomeValidation = (data: unknown) => {
  return updateGeneralIncomeSchema.safeParse(data)
}
