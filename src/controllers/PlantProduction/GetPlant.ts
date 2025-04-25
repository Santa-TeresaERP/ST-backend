import { Request, Response } from 'express'
import usePlant from '@services/Plant_Production'

const controllerGetPlant = async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await usePlant.getPlant(id)

  if (!result) {
    res.status(404).json({ error: 'Planta no encontrada' })
  }

  res.json(result)
}

export default controllerGetPlant
