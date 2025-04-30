import useWarehouse from '@services/warehouse/index'
import { Request, Response } from 'express'

const deleteWarehouseController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const warehouse = await useWarehouse.serviceDeleteWarehouse(req.params.id)
    if ('error' in warehouse) {
      res.status(400).json({ error: warehouse.error })
      return
    }
    res.json({ message: 'Almacén eliminado exitosamente' })
    return
  } catch {
    res.status(500).json({ error: 'Error interno del servidor' })
    return
  }
}

export default deleteWarehouseController
