import RecipeProductResource from '@models/recipe_product_resource'

interface UpdateRecipeData {
  quantity_required: string
  unit: string
}

const serviceUpdateRecipes = async (
  recipeId: string,
  updateData: UpdateRecipeData,
): Promise<[number, RecipeProductResource[]]> => {
  try {
    const [affectedCount, affectedRows] = await RecipeProductResource.update(
      updateData,
      {
        where: { id: recipeId },
        returning: true,
      },
    )

    return [affectedCount, affectedRows]
  } catch (error) {
    console.error('Error al actualizar la receta:', error)
    throw new Error('No se pudo actualizar la receta')
  }
}

export default serviceUpdateRecipes
