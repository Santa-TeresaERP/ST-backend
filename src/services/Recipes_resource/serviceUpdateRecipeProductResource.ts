import RecipeProductResource from '@models/recipe_product_resource'
import { RecipeProductResourceAttributes } from '@type/production/recipe_product_resourse'

const serviceUpdateRecipeProductResource = async (
  id: string,
  product_id: string,
  data: Partial<RecipeProductResourceAttributes>,
) => {
  const recipeProduct = await RecipeProductResource.findOne({
    where: { id, product_id },
  })
  if (!recipeProduct) throw new Error('RecipeProductResource no encontrado')

  await recipeProduct.update(data)
  return recipeProduct
}

export default serviceUpdateRecipeProductResource
