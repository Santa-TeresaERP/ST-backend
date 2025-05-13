import { Request, Response } from 'express'
import index from '@services/recipe_conections'

const updateRecipeProductConectionController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { recipe_id, resource_id, new_resource_id } = req.body

    const result = await index.serviceUpdateRecipeProductConection(
      recipe_id,
      resource_id,
      new_resource_id,
    )

    if ('error' in result) {
      res.status(400).json({ error: result.error })
      return
    }

    res.status(200).json({
      message: 'Conexión receta-recurso actualizada correctamente',
      data: result,
    })
  } catch {
    res
      .status(500)
      .json({ error: 'Error al actualizar la conexión receta-recurso' })
  }
}

export default updateRecipeProductConectionController
