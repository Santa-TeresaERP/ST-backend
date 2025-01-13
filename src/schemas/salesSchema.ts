import { salesAtributes } from '@type/sale'
import { z } from 'zod'

export const salesSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  total: z.number().positive(),
  observations: z.string().nullable(),
  createdAt: z.date(),
})

export const saleValidation = (data: salesAtributes) =>
  salesSchema.safeParse(data)
