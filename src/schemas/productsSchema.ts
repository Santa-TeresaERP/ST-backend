import { ProductAttributes } from '@type/products'
import { z } from 'zod'

const productsSchema = z.object({
  name: z
    .string()
    .min(1, 'El nombre del producto no puede estar vacío')  // Agregado para que el nombre no esté vacío
    .max(50, 'El nombre del producto no debe exceder los 50 caracteres'),

  categoryId: z
    .string()
    .uuid('El ID de la categoría debe ser un UUID válido')
    .nonempty('El ID de la categoría no puede estar vacío'),  // Agregado para que el ID no esté vacío

  price: z
    .number()
    .positive('El precio debe ser un número positivo'),

  stock: z
    .number()
    .int('El stock debe ser un número entero')
    .nonnegative('El stock no puede ser negativo'),

  description: z
    .string()
    .max(255, 'La descripción no debe exceder los 255 caracteres')
    .optional(),

  imagenUrl: z
    .string()
    .url('La URL de la imagen debe ser válida')
    .optional(),
})

export const productsValidation = (data: ProductAttributes) =>
  productsSchema.safeParse(data)
