import { z } from 'zod'
import { RecipeProductResourceAttributes } from '@type/recipe_product_conections'

const recipeProductResourceSchema = z.object({
  recipe_id: z.string().uuid('El ID de la receta debe ser un UUID válido'),

  resource_id: z
    .number({
      invalid_type_error: 'El ID del recurso debe ser un número',
    })
    .int('El ID del recurso debe ser un número entero')
    .positive('El ID del recurso debe ser mayor que cero'),
})

export const recipeProductResourceValidation = (data: RecipeProductResourceAttributes) =>
  recipeProductResourceSchema.safeParse(data)
