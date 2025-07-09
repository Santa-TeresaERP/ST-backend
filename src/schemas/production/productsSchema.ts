import { ProductAttributes } from '@type/production/products'
import { z } from 'zod'

const productsSchema = z.object({
  name: z
    .string()
    .min(1, 'El nombre del producto no puede estar vacío')
    .max(50, 'El nombre del producto no debe exceder los 50 caracteres'),

  category_id: z.string().uuid('El ID de la categoría debe ser un UUID válido'),

  price: z.number().positive('El precio debe ser un número positivo'),

  description: z
    .string()
    .max(2048, 'La descripción no debe exceder los 2048 caracteres')
    .optional(),

  // Cambiamos a optional ya que la URL se generará en el backend
  imagen_url: z.string().optional(),
})

export const productsValidation = (data: ProductAttributes) =>
  productsSchema.safeParse(data)
