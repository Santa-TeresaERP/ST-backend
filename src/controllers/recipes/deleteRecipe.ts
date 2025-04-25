import { Request, Response } from 'express'
import useRecipes from '@services/Recipes/index'

const deleteRecipeController = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { recipeId } = req.params

    if (!recipeId) {
      return res.status(400).json({
        message: 'Se requiere el ID de la receta',
      })
    }

    await useRecipes.deleteRecipes(recipeId)

    return res.status(200).json({
      message: 'Receta eliminada exitosamente',
    })
  } catch (error) {
    console.error('Error en deleteRecipe:', error)
    return res.status(500).json({
      message: 'Error al eliminar la receta',
      error: error instanceof Error ? error.message : 'Error desconocido',
    })
  }
}

export default deleteRecipeController
