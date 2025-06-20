import Recipe from '@models/recipe'
import { recipeAttributes } from '@type/production/recipes'
import { recipeValidation } from 'src/schemas/production/recipeSchema'

const serviceCreateRecipe = async (body: recipeAttributes) => {
  const validation = recipeValidation(body)

  if (!validation.success) {
    return { error: validation.error.errors }
  }

  const { productId, resourceId, quantity, unit } = validation.data

  const existingRecipe = await Recipe.findOne({
    where: { productId, resourceId },
  })
  if (existingRecipe) {
    return { error: 'La receta ya existe para este producto y recurso' }
  }

  const newRecipe = await Recipe.create({
    productId,
    resourceId,
    quantity,
    unit,
  })
  return newRecipe
}

export default serviceCreateRecipe
