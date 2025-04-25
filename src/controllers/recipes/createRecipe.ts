import { Request, Response } from 'express'
import useRecipes from '@services/Recipes/index'

const createRecipeController = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { recipe_id, resource_id } = req.body

    if (!recipe_id || !resource_id) {
      return res.status(400).json({
        message: 'Faltan campos requeridos: recipe_id y resource_id',
      })
    }

    const newRecipe = await useRecipes.createRecipe({
      recipe_id,
      resource_id,
    })

    return res.status(201).json({
      message: 'Receta creada exitosamente',
      data: newRecipe,
    })
  } catch (error) {
    console.error('Error en createRecipe:', error)
    return res.status(500).json({
      message: 'Error al crear la receta',
      error: error instanceof Error ? error.message : 'Error desconocido',
    })
  }
}

export default createRecipeController
