import { ProductAttributes } from '@type/production/products'
import { z } from 'zod'

const productsSchema = z.object({
  name: z
    .string()
    .min(1, 'El nombre del producto no puede estar vacío') // Agregado para que el nombre no esté vacío
    .max(50, 'El nombre del producto no debe exceder los 50 caracteres'),

  category_id: z.string().uuid('El ID de la categoría debe ser un UUID válido'),

  price: z.number().positive('El precio debe ser un número positivo'),

  description: z
    .string()
    .max(2048, 'La descripción no debe exceder los 2048 caracteres')
    .optional(),

  imagen_url: z.string().url('La URL de la imagen debe ser válida').optional(),
})

export const productsValidation = (data: ProductAttributes) =>
  productsSchema.safeParse(data)
