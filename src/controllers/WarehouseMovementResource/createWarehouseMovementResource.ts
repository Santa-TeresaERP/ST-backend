import { Request, Response } from 'express'
import serviceCreateWarehouseMovementResource from '@services/warehouseMovementResource/serviceCreateWarehouseMovementResource'

const createWarehouseMovementResource = async (req: Request, res: Response) => {
  const result = await serviceCreateWarehouseMovementResource(req.body)

  if ('error' in result) {
    return res.status(400).json({ error: result.error })
  }

  return res.status(201).json(result)
}

export default createWarehouseMovementResource
