import { Request, Response } from 'express'
import WarehouseMovementResource from '@models/warehouseMovomentResource'

const getWarehouseMovementResource = async (req: Request, res: Response) => {
  const { id } = req.params
  const record = await WarehouseMovementResource.findByPk(id)

  if (!record) {
    res.status(404).json({ error: 'Recurso no encontrado' })
  }

  res.json(record)
}

export default getWarehouseMovementResource
