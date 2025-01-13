import { returnsAttributes } from '@type/returns'
import { z } from 'zod'

export const returnSchema = z.object({
  id: z.string().uuid().optional(),
  productId: z.string().uuid(),
  salesId: z.string().uuid(),
  reason: z.string(),
  observations: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional()
});

export const productionValidation = (data: returnsAttributes) =>
  returnSchema.safeParse(data)




