import Recipe from '@models/recipe'
import Resource from '@models/resource'

const serviceGetRecipesByProd = async (productId: string) => {
  const recipes = await Recipe.findAll({
    where: { productId },
    include: [
      {
        model: Resource,
        as: 'resource',
      },
    ],
  })

  if (!recipes || recipes.length === 0) {
    return { error: 'No recipes found for this product' }
  }

  return recipes
}

export default serviceGetRecipesByProd
