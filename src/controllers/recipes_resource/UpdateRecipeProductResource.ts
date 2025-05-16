import { Request, Response } from 'express'
import index from '@services/Recipes_resource'

const updateRecipeProductResourceController = async (
  req: Request,
  res: Response,
) => {
  const { id, product_id } = req.params
  try {
    const updated = await index.serviceUpdateRecipeProductResource(
      id,
      product_id,
      req.body,
    )
    res
      .status(200)
      .json({ message: 'Recurso actualizado correctamente', updated })
    return
  } catch {
    res.status(500).json({ error: 'Error interno del servidor' })
    return
  }
}

export default updateRecipeProductResourceController
