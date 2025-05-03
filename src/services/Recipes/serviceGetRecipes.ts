import RecipeProductResource from '@models/recipe_product_resource'

const serviceGetRecipes = async (): Promise<RecipeProductResource[]> => {
  try {
    const recipes = await RecipeProductResource.findAll({
      attributes: [
        'id',
        'product_id',
        'quantity_required',
        'createdAt',
        'updatedAt',
      ],
    })

    return recipes
  } catch (error) {
    console.error('Error al obtener las recetas:', error)
    throw new Error('No se pudieron obtener las recetas')
  }
}

export default serviceGetRecipes
