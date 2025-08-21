import { z } from 'zod'

/**
 * Schema para validar la CREACIÓN de un nuevo registro de gasto.
 * Define todos los campos que el usuario debe proporcionar.
 */
export const createGeneralExpenseSchema = z.object({
  module_id: z
    .string()
    .uuid({ message: 'El ID del módulo debe ser un UUID válido.' }),
  expense_type: z
    .string()
    .min(1, 'El tipo de gasto es obligatorio.')
    .max(100, 'El tipo no debe exceder los 100 caracteres.'),
  amount: z
    .number({ invalid_type_error: 'El monto debe ser un número.' })
    .positive('El monto debe ser un número positivo.'),
  date: z.coerce.date({
    required_error: 'La fecha del gasto es obligatoria.',
    invalid_type_error: 'La fecha debe ser una fecha válida.',
  }),
  description: z
    .string()
    .max(500, 'La descripción no puede exceder los 500 caracteres.')
    .optional()
    .nullable(),
})

/**
 * Schema para validar la ACTUALIZACIÓN de un registro de gasto.
 * Usamos .partial() para que todos los campos sean opcionales.
 */
export const updateGeneralExpenseSchema = createGeneralExpenseSchema.partial()

// --- FUNCIONES DE VALIDACIÓN EXPORTADAS ---

export const createGeneralExpenseValidation = (data: unknown) => {
  return createGeneralExpenseSchema.safeParse(data)
}

export const updateGeneralExpenseValidation = (data: unknown) => {
  return updateGeneralExpenseSchema.safeParse(data)
}
