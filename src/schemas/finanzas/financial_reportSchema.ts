import { FinancialReportAttributes } from '@type/finanzas/financial_report'
import { z } from 'zod'

const financialReportSchema = z.object({
  start_date: z.coerce.date({
    required_error: 'La fecha de inicio es obligatoria',
  }),
  end_date: z.coerce.date({
    required_error: 'La fecha de fin es obligatoria',
  }),
  total_income: z
    .number({ invalid_type_error: 'El ingreso total debe ser numérico' })
    .nonnegative('El ingreso total no puede ser negativo'),

  total_expenses: z
    .number({ invalid_type_error: 'El gasto total debe ser numérico' })
    .nonnegative('El gasto total no puede ser negativo'),

  net_profit: z.number({
    invalid_type_error: 'La utilidad neta debe ser numérica',
  }),

  observations: z.coerce.date().optional(),
})

export const financialReportValidation = (data: FinancialReportAttributes) =>
  financialReportSchema.safeParse(data)
