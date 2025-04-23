import { Request, Response } from 'express'
import usePlant from '@services/Plant_Production'

const controllerCreatePlant = async (req: Request, res: Response) => {
  const result = await usePlant.CreatePlant(req.body)

  if ('error' in result) {
    res.status(400).json({ errors: result.error })
  }

  res.status(201).json(result)
}

export default controllerCreatePlant
