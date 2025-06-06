import useRecipe from '@services/Recipe'
import { Request, Response } from 'express'

const getRecipesController = async (_req: Request, res: Response) => {
  try {
    const recipe = await useRecipe.serviceGetRecipes()

    if (!recipe) {
      res.status(404).json({
        error: 'Recipe not found',
      })
    }

    res.status(200).json(recipe)
  } catch (error) {
    console.error('Error getting recipe:', error)
    res.status(500).json({
      error: 'Internal Server Error',
      message: error instanceof Error ? error.message : 'Unknown error',
    })
  }
}

export default getRecipesController
