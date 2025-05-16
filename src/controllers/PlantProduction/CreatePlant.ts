import { Request, Response, NextFunction } from 'express'
import usePlant from '@services/Plant_Production/index'

const controllerCreatePlant = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const result = await usePlant.CreatePlant(req.body)

    if ('error' in result) {
      res.status(400).json({ errors: result.error })
      return
    }

    res.status(201).json(result) // Respuesta exitosa
  } catch (error) {
    console.error('Error in controllerCreatePlant:', error)
    next(error) // Delegar el error al middleware de manejo de errores
  }
}

export default controllerCreatePlant
