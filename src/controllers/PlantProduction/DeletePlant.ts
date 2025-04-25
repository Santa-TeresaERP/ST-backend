import { Request, Response } from 'express'
import usePlant from '@services/Plant_Production'

const controllerDeletePlant = async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await usePlant.deletePlant(id)

  if ('error' in result) {
    res.status(404).json({ error: result.error })
  }

  res.json({ message: 'Planta eliminada correctamente' })
}

export default controllerDeletePlant
