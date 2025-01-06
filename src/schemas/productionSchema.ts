import { productionAttributes } from '@type/production'
import { z } from 'zod'

const ProductionSchema = z.object({
  productId: z
    .string()
    .uuid('El ID del producto debe ser un UUID válido')
    .nonempty('El producto no puede estar vacío'),
  quantityProduced: z
    .number({ invalid_type_error: 'Debe ser un número' })
    .positive('La cantidad producida debe ser mayor a cero'),
  quantityUsed: z
    .string()
    .nonempty('La cantidad utilizada no puede estar vacía'),
  productionDate: z
    .string()
    .refine(
      (date) => !isNaN(Date.parse(date)),
      'La fecha de producción debe ser válida',
    ),
  observation: z
    .string()
    .max(150, 'La observación no puede superar los 150 caracteres')
    .regex(
      /^[a-zA-Z\s]*$/,
      'La observación solo puede contener letras y espacios',
    ),
})

export const productionValidation = (data: productionAttributes) =>
  ProductionSchema.safeParse(data)
