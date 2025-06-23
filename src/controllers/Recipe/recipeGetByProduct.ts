import useRecipe from '@services/Recipe'
import { Request, Response } from 'express'

const getRecipesByProd = async (req: Request, res: Response): Promise<void> => {
  try {
    const productId = req.params.id
    const recipes = await useRecipe.serviceGetRecipesByProd(productId)

    if (!Array.isArray(recipes) || recipes.length === 0) {
      res.status(404).json({
        error: 'No recipes found for this product',
        message: `No recipes found for product with ID ${productId}`,
      })
      return
    }

    res.status(200).json(recipes)
  } catch (error) {
    console.error('Error getting recipes by product:', error)
    res.status(500).json({
      error: 'Internal Server Error',
      message:
        error instanceof Error ? error.message : 'Unknown error occurred',
    })
  }
}

export default getRecipesByProd
