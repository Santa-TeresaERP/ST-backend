import RecipeProductResource from '@models/recipe_product_resource'

const serviceDeleteRecipeProductResource = async (
  id: string,
  product_id: string,
) => {
  const deletedCount = await RecipeProductResource.destroy({
    where: { id, product_id },
  })
  if (deletedCount === 0) throw new Error('RecipeProductResource no encontrado')
  return true
}

export default serviceDeleteRecipeProductResource
