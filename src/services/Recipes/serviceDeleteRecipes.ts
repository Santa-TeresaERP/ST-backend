import RecipeProductResource from '@models/recipe_product_conections'
import RecipeProductConections from '@models/recipe_product_conections'

const serviceDeleteRecipes = async (recipeId: string): Promise<void> => {
  try {
    // Eliminar las conexiones de productos de la receta
    await RecipeProductConections.destroy({
      where: { recipe_id: recipeId },
    })

    // Eliminar los recursos de productos de la receta
    await RecipeProductResource.destroy({
      where: { recipe_id: recipeId },
    })
  } catch (error) {
    console.error('Error al eliminar la receta:', error)
    throw new Error('No se pudo eliminar la receta')
  }
}

export default serviceDeleteRecipes
