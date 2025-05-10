import { Request, Response } from 'express'
import useRecipes from '@services/Recipes/index'
import { z } from 'zod'

const recipeIdSchema = z
  .string()
  .uuid('El ID de la receta debe ser un UUID válido')

const getRecipesByIDController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { recipeId } = req.params

    // Validar que el ID sea un UUID válido
    const validationResult = recipeIdSchema.safeParse(recipeId)
    if (!validationResult.success) {
      res.status(400).json({
        message: 'ID de receta inválido',
        errors: validationResult.error.errors,
      })
      return
    }

    const recipe = await useRecipes.getRecipesByID(recipeId)

    if (!recipe) {
      res.status(404).json({
        message: 'Receta no encontrada',
      })
      return
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
