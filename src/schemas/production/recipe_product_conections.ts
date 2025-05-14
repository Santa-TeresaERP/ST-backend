import { z } from 'zod'
import { RecipeProductConectionAttributes } from '@type/production/recipe_product_conections'

const recipeProductResourceSchema = z.object({
  recipe_id: z.string().uuid('El ID de la receta debe ser un UUID válido'),

  resource_id: z.string().uuid('El ID de la receta debe ser un UUID válido'),
})

export const recipeProductResourceValidation = (
  data: RecipeProductConectionAttributes,
) => recipeProductResourceSchema.safeParse(data)
