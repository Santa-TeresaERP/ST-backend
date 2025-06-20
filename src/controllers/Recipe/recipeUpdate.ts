import useRecipe from '@services/Recipe/index'
import { Request, Response } from 'express'

const updateRecipe = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const updatedRecipe = await useRecipe.serviceUpdateRecipe(id, req.body)
    if (!updatedRecipe) {
      res.status(404).json({
        error: 'Recipe not found',
        message: `No recipe found with ID ${id}`,
      })
    }
    res.status(200).json({
      message: 'Recipe updated successfully',
      recipe: updatedRecipe,
    })
  } catch (error) {
    console.error('Error updating recipe:', error)
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

export default updateRecipe
