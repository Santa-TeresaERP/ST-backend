import { Request, Response } from 'express'
import useRecipes from '@services/Recipes/index'

const deleteRecipeController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { recipeId } = req.params

    if (!recipeId) {
      res.status(400).json({
        message: 'Se requiere el ID de la receta',
      })
    }

    await useRecipes.deleteRecipes(recipeId)

    res.status(200).json({
      message: 'Receta eliminada exitosamente',
    })
  } catch (error) {
    console.error('Error en deleteRecipe:', error)
    res.status(500).json({
      message: 'Error al eliminar la receta',
      error: error instanceof Error ? error.message : 'Error desconocido',
    })
  }
}

export default deleteRecipeController
