import RecipeProductResource from '@models/recipe_product_resource'
import { RecipeProductResourceAttributes } from '@type/production/recipe_product_resourse'
import { recipeProductResourceValidation } from 'src/schemas/production/recipe_product_resourse'

const serviceUpdateRecipeProductResource = async (
  id: string,
  body: RecipeProductResourceAttributes,
) => {
  const validation = recipeProductResourceValidation(body)

  if (!validation.success) {
    return { error: validation.error.errors }
  }

  const { product_id, quantity_required, unit } = validation.data

  const recipeProduct = await RecipeProductResource.findByPk(id)
  if (!recipeProduct) throw new Error('RecipeProductResource no encontrado')

  await recipeProduct.update({
    product_id,
    quantity_required,
    unit,
  })
  return recipeProduct
}

export default serviceUpdateRecipeProductResource
