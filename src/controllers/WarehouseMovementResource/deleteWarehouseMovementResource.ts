import { Request, Response } from 'express'
import WarehouseMovementResource from '@models/warehouseMovomentResource'

const deleteWarehouseMovementResource = async (req: Request, res: Response) => {
  const { id } = req.params
  const record = await WarehouseMovementResource.findByPk(id)

  if (!record) {
    res.status(404).json({ error: 'Recurso no encontrado' })
  } else {
    await record.destroy()
    res.json({ message: 'Recurso eliminado correctamente' })
  }
}

export default deleteWarehouseMovementResource
