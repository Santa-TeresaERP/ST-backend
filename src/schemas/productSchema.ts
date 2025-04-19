import { z } from 'zod'
import { ProductAttributes } from '@type/product'

const productsSchema = z.object({
  product_id: z.string().uuid('El ID del producto debe ser un UUID válido').optional(),

  name: z
    .string()
    .min(1, 'El nombre del producto no puede estar vacío')
    .max(50, 'El nombre del producto no debe exceder los 50 caracteres'),

  category_id: z
    .string()
    .uuid('El ID de la categoría debe ser un UUID válido'),

  price: z
    .number()
    .positive('El precio debe ser un número positivo'),

  stock: z
    .number()
    .int('El stock debe ser un número entero')
    .nonnegative('El stock no puede ser negativo'),

  description: z
    .string()
    .max(255, 'La descripción no debe exceder los 255 caracteres'),

  imagen_url: z
    .string()
    .url('La URL de la imagen debe ser válida'),

  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
})

export const productsValidation = (data: ProductAttributes) =>
  productsSchema.safeParse(data)
