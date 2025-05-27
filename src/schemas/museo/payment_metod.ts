import { z } from 'zod'
import { paymentMethodAttributes } from '@type/museo/payment_metod'

export const paymentMethodSchema = z.object({
  name: z
    .string()
    .min(1, 'El nombre del método de pago es obligatorio')
    .max(100, 'El nombre no debe exceder los 100 caracteres'),
})

export const paymentMethodValidation = (data: paymentMethodAttributes) =>
  paymentMethodSchema.safeParse(data)
