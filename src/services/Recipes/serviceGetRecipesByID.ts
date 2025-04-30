import RecipeProductResource from '@models/recipe_product_conections'
import Resource from '@models/resource'
import Recipe from '@models/recipe_product_conections'

const serviceGetRecipesByID = async (
  recipeId: string,
): Promise<RecipeProductResource | null> => {
  try {
    const recipe = await RecipeProductResource.findOne({
      where: { recipe_id: recipeId },
      include: [
        {
          model: Resource,
          as: 'resource',
        },
        {
          model: Recipe,
          as: 'recipe',
        },
      ],
    })

    return recipe
  } catch (error) {
    console.error('Error al obtener la receta:', error)
    throw new Error('No se pudo obtener la receta')
  }
}

export default serviceGetRecipesByID
