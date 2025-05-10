import { Request, Response } from 'express'
import useRecipes from '@services/Recipes/index'
import { z } from 'zod'

const recipeIdSchema = z
  .string()
  .uuid('El ID de la receta debe ser un UUID válido')

const updateRecipeSchema = z.object({
  quantity_required: z.string().min(1, 'La cantidad requerida es obligatoria'),
  unit: z.string().min(1, 'La unidad es obligatoria'),
})

const updateRecipesController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { recipeId } = req.params

    // Validar el ID
    const idValidation = recipeIdSchema.safeParse(recipeId)
    if (!idValidation.success) {
      res.status(400).json({
        message: 'ID de receta inválido',
        errors: idValidation.error.errors,
      })
      return
    }

    // Validar el body
    const bodyValidation = updateRecipeSchema.safeParse(req.body)
    if (!bodyValidation.success) {
      res.status(400).json({
        message: 'Datos de actualización inválidos',
        errors: bodyValidation.error.errors,
      })
      return
    }

    const [affectedCount, affectedRows] = await useRecipes.updateRecipes(
      recipeId,
      bodyValidation.data,
    )

    if (affectedCount === 0) {
      res.status(404).json({
        message: 'Receta no encontrada',
      })
      return
    }

    res.status(200).json({
      message: 'Receta actualizada exitosamente',
      data: affectedRows[0],
    })
  } catch (error) {
    console.error('Error en updateRecipes:', error)
    res.status(500).json({
      message: 'Error al actualizar la receta',
      error: error instanceof Error ? error.message : 'Error desconocido',
    })
  }
}

export default updateRecipesController
