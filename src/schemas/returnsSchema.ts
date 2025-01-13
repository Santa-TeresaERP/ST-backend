import { returnsAttributes } from '@type/return'

import { z } from 'zod'

export const returnSchema = z.object({
  id: z.string().uuid(),
  productId: z.string().uuid(),
  salesId: z.string().uuid(),
  reason: z.string().nullable(),
  observations: z.string().nullable(),
  createdAt: z.date(),
})

export const productionValidation = (data: returnsAttributes) =>
  returnSchema.safeParse(data)
