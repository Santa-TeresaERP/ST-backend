import { Request, Response } from 'express'
import serviceUpdateWarehouseMovementResource from '@services/warehouseMovementResource/serviceUpdateWarehouseMovementResource'

const updateWarehouseMovementResource = async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await serviceUpdateWarehouseMovementResource(id, req.body)

  if ('error' in result) {
    res.status(400).json({ error: result.error })
  }

  res.json(result)
}

export default updateWarehouseMovementResource
