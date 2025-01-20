import { salesItemsAttributes } from '@type/salesItem';
import { z } from 'zod';

export const salesItemsSchema = z.object({
  salesId: z
    .string()
    .uuid('El ID de la venta debe ser un UUID válido'),

  productId: z
    .string()
    .min(1, 'El ID del producto no puede estar vacío')
    .refine((val) => !/<script|<\/script|SELECT|DROP|INSERT|--/i.test(val), 
      'El ID del producto contiene caracteres no permitidos o posibles inyecciones'),

  quantity: z
    .number()
    .int('La cantidad debe ser un número entero')
    .positive('La cantidad debe ser un número positivo')
    .max(9, 'La cantidad no puede superar los 9'),
});

export const salesItemsValidation = (data: salesItemsAttributes) =>
  salesItemsSchema.safeParse(data);

