import { salesItemsAttributes } from '@type/salesItem'
import { z } from 'zod'

export const salesItemsSchema = z.object({
  salesId: z.string().uuid(),
  productId: z.string(),
  quantity: z.number().int().positive(),
})

export const salesItemsValidation = (data: salesItemsAttributes) =>
  salesItemsSchema.safeParse(data)
