import { Request, Response } from 'express'
import index from '@services/recipe_conections'

const getRecipeProductConectionsController = async (
  _req: Request,
  res: Response,
) => {
  try {
    const result = await index.serviceGetRecipeProductConections()
    res.status(200).json(result)
  } catch {
    res
      .status(500)
      .json({ error: 'Error al obtener las conexiones receta-recurso' })
  }
}

export default getRecipeProductConectionsController
