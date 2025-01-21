import { returnAttributes } from '@type/return'

import { z } from 'zod'

export const returnSchema = z.object({
  id: z.string().uuid(),
  productId: z.string().uuid(),
  salesId: z.string().uuid(),
  reason: z.string().nullable(),
  observations: z.string().nullable(),
  createdAt: z.date().optional(),
})

export const productionValidation = (data: returnAttributes) =>
  returnSchema.safeParse(data)
