import RecipeProductResource from '@models/recipe_product_conections'
import Resource from '@models/resource'
import Recipe from '@models/recipe_product_conections'

const serviceGetRecipes = async (): Promise<RecipeProductResource[]> => {
  try {
    const recipes = await RecipeProductResource.findAll({
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

    return recipes
  } catch (error) {
    console.error('Error al obtener las recetas:', error)
    throw new Error('No se pudieron obtener las recetas')
  }
}

export default serviceGetRecipes
