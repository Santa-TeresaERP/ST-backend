import { Request, Response } from 'express'
import index from '@services/recipe_conections'

const createRecipeProductConectionController = async (
  req: Request,
  res: Response,
) => {
  try {
    const result = await index.serviceCreateRecipeProductConection(req.body)
    if ('error' in result) {
      res.status(400).json({ error: result.error })
      return
    }
    res.status(201).json({
      message: 'Conexión receta-recurso creada exitosamente',
      data: result,
    })
  } catch {
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export default createRecipeProductConectionController
