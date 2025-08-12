import { z } from 'zod'

// --- SCHEMA PARA LA CREACIÓN ---
// Este es tu schema original, es perfecto para crear un nuevo ítem en la receta.
// Requiere todos los campos.
const createRecipeSchema = z.object({
  productId: z.string().uuid('El ID del producto debe ser un UUID válido'),
  resourceId: z.string().uuid('El ID del recurso debe ser un UUID válido'),
  quantity: z
    .number()
    .min(0, 'La cantidad debe ser un número positivo')
    .max(1000000, 'La cantidad no debe exceder 1,000,000'),
  unit: z.enum(['g', 'kg', 'ml', 'l', 'unidades'], {
    invalid_type_error: 'La unidad debe ser uno de: g, kg, ml, l, unidades',
  }),
})

// --- [NUEVO] SCHEMA PARA LA ACTUALIZACIÓN ---
// Este schema es más específico. Solo permite la actualización de 'quantity' y 'unit'.
const updateRecipeSchema = z.object({
  quantity: z
    .number()
    .min(0, 'La cantidad debe ser un número positivo')
    .max(1000000, 'La cantidad no debe exceder 1,000,000')
    .optional(), // Hacemos los campos opcionales por si solo se quiere cambiar uno
  unit: z
    .enum(['g', 'kg', 'ml', 'l', 'unidades'], {
      invalid_type_error: 'La unidad debe ser uno de: g, kg, ml, l, unidades',
    })
    .optional(),
})

// --- FUNCIONES DE VALIDACIÓN EXPORTADAS ---

/**
 * Valida los datos para CREAR un nuevo ítem de receta.
 */
export const createRecipeValidation = (data: unknown) => {
  return createRecipeSchema.safeParse(data)
}

/**
 * Valida los datos para ACTUALIZAR un ítem de receta existente.
 */
export const updateRecipeValidation = (data: unknown) => {
  return updateRecipeSchema.safeParse(data)
}
