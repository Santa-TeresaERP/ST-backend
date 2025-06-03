import { z } from 'zod'
import { salesChannelAttributes } from '@type/museo/Sales_channel'

export const salesChannelSchema = z.object({
  name: z
    .string()
    .min(1, 'El nombre del canal de venta es obligatorio')
    .max(100, 'El nombre no debe exceder los 100 caracteres'),
})

export const salesChannelValidation = (data: salesChannelAttributes) =>
  salesChannelSchema.safeParse(data)
