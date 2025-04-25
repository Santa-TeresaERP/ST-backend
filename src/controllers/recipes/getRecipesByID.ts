import { Request, Response } from 'express'
import useRecipes from '@services/Recipes/index'

const getRecipesByIDController = async (
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

    const recipe = await useRecipes.getRecipesByID(recipeId)

    if (!recipe) {
      res.status(404).json({
        message: 'Receta no encontrada',
      })
    }

    res.status(200).json({
      message: 'Receta obtenida exitosamente',
      data: recipe,
    })
  } catch (error) {
    console.error('Error en getRecipesByID:', error)
    res.status(500).json({
      message: 'Error al obtener la receta',
      error: error instanceof Error ? error.message : 'Error desconocido',
    })
  }
}

export default getRecipesByIDController
