import { Request, Response } from 'express'
import WarehouseMovementResource from '@models/warehouseMovomentResource'

const getWarehouseMovementResources = async (_req: Request, res: Response) => {
  const records = await WarehouseMovementResource.findAll()
  res.json(records)
}

export default getWarehouseMovementResources
