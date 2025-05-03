import RecipeProductResource from '@models/recipe_product_resource'

const serviceGetRecipesByID = async (
  recipeId: string,
): Promise<RecipeProductResource | null> => {
  try {
    const recipe = await RecipeProductResource.findOne({
      where: { id: recipeId },
      attributes: [
        'id',
        'product_id',
        'quantity_required',
        'createdAt',
        'updatedAt',
      ],
    })

    return recipe
  } catch (error) {
    console.error('Error al obtener la receta:', error)
    throw new Error('No se pudo obtener la receta')
  }
}

export default serviceGetRecipesByID
