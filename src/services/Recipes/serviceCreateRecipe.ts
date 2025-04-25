import RecipeProductResource from '@models/recipe_product_conections'

const serviceCreateRecipe = async (recipeData: {
  recipe_id: string
  resource_id: number
}): Promise<RecipeProductResource> => {
  try {
    const recipeProduct = await RecipeProductResource.create({
      recipe_id: recipeData.recipe_id,
      resource_id: recipeData.resource_id,
    })

    return recipeProduct
  } catch (error) {
    console.error('Error al crear la receta:', error)
    throw new Error('No se pudo crear la receta')
  }
}

export default serviceCreateRecipe
