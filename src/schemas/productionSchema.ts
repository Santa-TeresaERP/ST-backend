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
    .number({ invalid_type_error: 'Debe ser un número' })
    .positive('La cantidad utilizada debe ser mayor a cero'),

  productionDate: z
    .string()
    .refine(
      (date) => !isNaN(Date.parse(date)),
      'La fecha de producción debe ser válida',
    )
    .refine(
      (date) => new Date(date) <= new Date(),
      'La fecha de producción no puede ser futura',
    ),

  observation: z
    .string()
    .max(150, 'La observación no puede superar los 150 caracteres')
    .regex(
      /^[a-zA-ZáéíóúÁÉÍÓÚÑñ\s0-9,.-]*$/,
      'La observación solo puede contener letras, números, espacios y algunos caracteres especiales como: , . -',
    ),
})

export const productionValidation = (data: productionAttributes) =>
  ProductionSchema.safeParse(data)
