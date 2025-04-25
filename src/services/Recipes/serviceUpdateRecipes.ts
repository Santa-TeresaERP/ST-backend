import RecipeProductResource from '@models/recipe_product_conections'

const serviceUpdateRecipes = async (
  recipeId: string,
  updateData: {
    resource_id?: number
  },
): Promise<[number, RecipeProductResource[]]> => {
  try {
    const [affectedCount, affectedRows] = await RecipeProductResource.update(
      updateData,
      {
        where: { recipe_id: recipeId },
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
