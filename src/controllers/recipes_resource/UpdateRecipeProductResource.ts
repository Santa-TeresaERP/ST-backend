import { Request, Response } from 'express'
import index from '@services/Recipes_resource'

const updateRecipeProductResourceController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params
    const recipe = await index.serviceUpdateRecipeProductResource(id, req.body)

    if ('error' in recipe) {
      res.status(400).json({ error: recipe.error })
    }
    res
      .status(200)
      .json({ message: 'Recurso actualizado correctamente', recipe })
  } catch {
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export default updateRecipeProductResourceController
