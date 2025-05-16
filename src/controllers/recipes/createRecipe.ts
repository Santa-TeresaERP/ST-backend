import { Request, Response } from 'express'
import useRecipes from '@services/Recipes/index'
import { z } from 'zod'

const recipeSchema = z.object({
  product_id: z.string().uuid('El product_id debe ser un UUID válido'),
  quantity_required: z.string().min(1, 'La cantidad requerida es obligatoria'),
})

const createRecipeController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const validationResult = recipeSchema.safeParse(req.body)

    if (!validationResult.success) {
      res.status(400).json({
        message: 'Datos inválidos',
        errors: validationResult.error.errors,
      })
      return
    }

    const { product_id, quantity_required } = validationResult.data

    const newRecipe = await useRecipes.createRecipe({
      product_id,
      quantity_required,
    })

    res.status(201).json({
      message: 'Receta creada exitosamente',
      data: newRecipe,
    })
  } catch (error) {
    console.error('Error en createRecipe:', error)
    res.status(500).json({
      message: 'Error al crear la receta',
      error: error instanceof Error ? error.message : 'Error desconocido',
    })
  }
}

export default createRecipeController
