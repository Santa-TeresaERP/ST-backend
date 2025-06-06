import { Request, Response } from 'express'
import useRecipe from '@services/Recipe'

const deleteRecipeController = async (req: Request, res: Response) => {
  try {
    const recipe = await useRecipe.serviceDeleteRecipe(req.params.id)
    if (!recipe) {
      res.status(404).json({
        error: 'Recipe not found',
        message: `No recipe found with ID ${req.params.id}`,
      })
    } else {
      res.status(200).json({
        message: 'Recipe deleted successfully',
        recipe,
      })
    }
  } catch (error) {
    console.error('Error deleting recipe:', error)
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

export default deleteRecipeController
