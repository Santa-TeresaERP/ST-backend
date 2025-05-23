import { GeneralIncomeAttributes } from '@type/finanzas/general_income'
import { z } from 'zod'

const generalIncomeSchema = z.object({
  module_id: z.string().uuid('El ID del módulo debe ser un UUID válido'),

  income_type: z
    .string()
    .min(1, 'El tipo de ingreso no puede estar vacío')
    .max(50, 'El tipo de ingreso no debe exceder los 50 caracteres'),

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

export const generalIncomeValidation = (data: GeneralIncomeAttributes) =>
  generalIncomeSchema.safeParse(data)
