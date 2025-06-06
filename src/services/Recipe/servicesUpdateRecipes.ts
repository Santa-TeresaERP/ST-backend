import Recipe from '@models/recipe'
import { recipeAttributes } from '@type/production/recipes'
import { recipeValidation } from 'src/schemas/production/recipeSchema'

const serviceUpdateRecipe = async (id: string, body: recipeAttributes) => {
  const validation = recipeValidation(body)

  if (!validation.success) {
    return { error: validation.error.errors }
  }

  const { productId, resourceId, quantity, unit } = validation.data

  const recipe = await Recipe.findByPk(id)
  if (!recipe) {
    return { error: 'La receta no existe' }
  }

  await recipe.update({ productId, resourceId, quantity, unit })
  return recipe
}

export default serviceUpdateRecipe
