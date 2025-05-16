import { Request, Response } from 'express'
import index from '@services/Recipes_resource'

const getRecipeProductResourceController = async (
  _req: Request,
  res: Response,
) => {
  try {
    const resources = await index.serviceGetRecipeProductResources()
    res.status(200).json(resources)
  } catch {
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export default getRecipeProductResourceController
