import { Request, Response } from 'express'
import usePlant from '@services/Plant_Production'

const controllerGetPlants = async (_req: Request, res: Response) => {
  const result = await usePlant.getPlants()
  res.json(result)
}

export default controllerGetPlants
