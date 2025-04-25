import { Request, Response } from 'express'
import useRecipes from '@services/Recipes/index'

const updateRecipesController = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { recipeId } = req.params
    const { resource_id } = req.body

    if (!recipeId) {
      return res.status(400).json({
        message: 'Se requiere el ID de la receta',
      })
    }

    if (!resource_id) {
      return res.status(400).json({
        message: 'Se requiere el ID del recurso',
      })
    }

    const [affectedCount, affectedRows] = await useRecipes.updateRecipes(
      recipeId,
      {
        resource_id,
      },
    )

    if (affectedCount === 0) {
      return res.status(404).json({
        message: 'Receta no encontrada',
      })
    }

    return res.status(200).json({
      message: 'Receta actualizada exitosamente',
      data: affectedRows[0],
    })
  } catch (error) {
    console.error('Error en updateRecipes:', error)
    return res.status(500).json({
      message: 'Error al actualizar la receta',
      error: error instanceof Error ? error.message : 'Error desconocido',
    })
  }
}

export default updateRecipesController
