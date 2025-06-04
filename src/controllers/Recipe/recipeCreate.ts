import useRecipe from '@services/Recipe'
import { Request, Response } from 'express'

const createRecipeController = async (req: Request, res: Response) => {
  try {
    const recipe = await useRecipe.serviceCreateRecipe(req.body)
    res.status(201).json(recipe)
  } catch (error) {
    console.error('Error creating recipe:', error)

    if (error instanceof Error) {
      res.status(500).json({
        error: 'Internal Server Error',
        message: error.message,
      })
    } else {
      res.status(500).json({
        error: 'Internal Server Error',
        message: 'Unknown error occurred',
      })
    }
  }
}

export default createRecipeController
