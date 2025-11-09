// src/schemas/almacen/productPurchasedSchema.ts

import { z } from 'zod'

export const createProductPurchasedSchema = z.object({
  name: z
    .string({
      required_error: 'El nombre es obligatorio.',
    })
    .min(3, 'El nombre debe tener al menos 3 caracteres.'),

  description: z.string().optional(),
})

export const updateProductPurchasedSchema =
  createProductPurchasedSchema.partial()

// Funciones helper para usar en los servicios
export const productPurchasedValidation = (data: unknown) =>
  createProductPurchasedSchema.safeParse(data)
export const productPurchasedUpdateValidation = (data: unknown) =>
  updateProductPurchasedSchema.safeParse(data)
