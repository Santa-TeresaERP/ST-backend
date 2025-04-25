import { Request, Response } from 'express'
import useRecipes from '@services/Recipes/index'

const getRecipesController = async (
  _req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const recipes = await useRecipes.getRecipes()

    return res.status(200).json({
      message: 'Recetas obtenidas exitosamente',
      data: recipes,
    })
  } catch (error) {
    console.error('Error en getRecipes:', error)
    return res.status(500).json({
      message: 'Error al obtener las recetas',
      error: error instanceof Error ? error.message : 'Error desconocido',
    })
  }
}

export default getRecipesController
