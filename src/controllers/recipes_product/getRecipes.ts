import { Request, Response } from 'express'
import useRecipes from '@services/Recipes/index'

const getRecipesController = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  try {
    const recipes = await useRecipes.getRecipes()

    res.status(200).json({
      message: 'Recetas obtenidas exitosamente',
      data: recipes,
    })
  } catch (error) {
    console.error('Error en getRecipes:', error)
    res.status(500).json({
      message: 'Error al obtener las recetas',
      error: error instanceof Error ? error.message : 'Error desconocido',
    })
  }
}

export default getRecipesController
