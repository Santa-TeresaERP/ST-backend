import { GeneralExpenseAttributes } from '@type/finanzas/general_expense'
import { z } from 'zod'

const generalExpenseSchema = z.object({
  module_id: z.string().uuid('El ID del módulo debe ser un UUID válido'),

  expense_type: z
    .string()
    .min(1, 'El tipo de gasto no puede estar vacío')
    .max(50, 'El tipo de gasto no debe exceder los 50 caracteres'),

  amount: z
    .number({ invalid_type_error: 'El monto debe ser numérico' })
    .positive('El monto debe ser mayor que cero'),

  date: z.string().min(1, 'La fecha es obligatoria'),

  description: z
    .string()
    .max(255, 'La descripción no debe exceder los 255 caracteres')
    .optional(),

  report_id: z.string().uuid('El ID del reporte debe ser un UUID válido'),
})

export const generalExpenseValidation = (data: GeneralExpenseAttributes) =>
  generalExpenseSchema.safeParse(data)
