import { z } from 'zod'

export const createMonasteryExpenseSchema = z.object({
  expense_date: z.coerce.date({
    required_error: 'La fecha del gasto es requerida',
    invalid_type_error: 'La fecha del gasto debe ser una fecha válida',
  }),
  description: z
    .string({
      required_error: 'La descripción es requerida',
      invalid_type_error: 'La descripción debe ser un texto',
    })
    .min(3, 'La descripción debe tener al menos 3 caracteres')
    .max(255, 'La descripción no puede tener más de 255 caracteres')
    .transform((desc) => desc.trim()),

  amount: z
    .number({
      required_error: 'El monto es requerido',
      invalid_type_error: 'El monto debe ser un número',
    })
    .positive('El monto debe ser mayor a cero'),

  category: z
    .string({
      required_error: 'La categoría es requerida',
      invalid_type_error: 'La categoría debe ser un texto',
    })
    .min(2, 'La categoría debe tener al menos 2 caracteres')
    .max(100, 'La categoría no puede tener más de 100 caracteres'),

  payment_method: z
    .string({
      required_error: 'El método de pago es requerido',
      invalid_type_error: 'El método de pago debe ser un texto',
    })
    .min(2, 'El método de pago debe tener al menos 2 caracteres')
    .max(50, 'El método de pago no puede tener más de 50 caracteres'),

  receipt_number: z
    .string()
    .max(50, 'El número de recibo no puede tener más de 50 caracteres')
    .optional()
    .nullable(),

  notes: z
    .string()
    .max(1000, 'Las notas no pueden tener más de 1000 caracteres')
    .optional()
    .nullable(),
})

export const updateMonasteryExpenseSchema =
  createMonasteryExpenseSchema.partial()

export const monasteryExpenseFiltersSchema = z
  .object({
    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional(),
    category: z.string().optional(),
    payment_method: z.string().optional(),
    minAmount: z.coerce.number().min(0).optional(),
    maxAmount: z.coerce.number().min(0).optional(),
  })
  .refine(
    (data) => {
      if (data.startDate && data.endDate) {
        return data.startDate <= data.endDate
      }
      return true
    },
    {
      message: 'La fecha de inicio no puede ser posterior a la fecha de fin',
      path: ['startDate'],
    },
  )

export type CreateMonasteryExpenseInput = z.infer<
  typeof createMonasteryExpenseSchema
>
export type UpdateMonasteryExpenseInput = z.infer<
  typeof updateMonasteryExpenseSchema
>
export type MonasteryExpenseFilters = z.infer<
  typeof monasteryExpenseFiltersSchema
>
