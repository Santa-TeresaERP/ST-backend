import { Request, Response } from 'express'
import useWarehouse from '@services/warehouse/index'

const createWarehouseController = async (req: Request, res: Response) => {
  try {
    const warehouse = await useWarehouse.serviceCreateWarehouse(req.body)
    if ('error' in warehouse) {
      res.status(400).json({ error: warehouse.error })
      return
    }
    res.status(201).json({ message: 'Almacén creado exitosamente', warehouse })
    return
  } catch {
    res.status(500).json({ error: 'Error interno del servidor' })
    return
  }
}

export default createWarehouseController
