import { Request, Response } from 'express'
import useRecipes from '@services/Recipes/index'

const deleteRecipeController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id, product_id } = req.params

    if (!id || !product_id) {
      res.status(400).json({
        message: 'Se requiere el ID y el ID del producto',
      })
      return
    }

    await useRecipes.deleteRecipes(id, product_id)

    res.status(200).json({
      message: 'Recurso de receta eliminado exitosamente',
    })
  } catch (error) {
    console.error('Error en deleteRecipe:', error)
    res.status(500).json({
      message: 'Error al eliminar el recurso de la receta',
      error: error instanceof Error ? error.message : 'Error desconocido',
    })
  }
}

export default deleteRecipeController
