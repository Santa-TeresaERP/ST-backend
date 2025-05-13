import { Request, Response } from 'express'
import index from '@services/recipe_conections'

const deleteRecipeProductConectionController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { recipe_id, resource_id } = req.params
    const result = await index.serviceDeleteRecipeProductConection(
      recipe_id,
      Number(resource_id),
    )
    if ('error' in result) {
      res.status(404).json({ error: result.error })
    }
    res
      .status(200)
      .json({ message: 'Conexión receta-recurso eliminada exitosamente' })
  } catch {
    res
      .status(500)
      .json({ error: 'Error al eliminar la conexión receta-recurso' })
  }
}

export default deleteRecipeProductConectionController
