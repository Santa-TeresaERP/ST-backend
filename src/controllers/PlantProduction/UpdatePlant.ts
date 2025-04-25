import { Request, Response } from 'express'
import usePlant from '@services/Plant_Production'

const controllerUpdatePlant = async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await usePlant.updatePlant(id, req.body)

  if ('error' in result) {
    res.status(400).json({ error: result.error })
  }

  res.json(result)
}

export default controllerUpdatePlant
