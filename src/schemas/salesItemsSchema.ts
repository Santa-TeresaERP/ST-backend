import { salesItemAttributes } from "@type/salesItems";
import { z } from "zod";

export const salesItemsSchema = z.object({
  salesId: z.string().uuid(),
  productId: z.string(),
  quantity: z.number().int().positive(),
  price: z.number().positive(),
});

export const salesItemsValidation = (data: salesItemAttributes) =>
  salesItemsSchema.safeParse(data);


