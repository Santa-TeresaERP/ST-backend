import { Request, Response, RequestHandler } from 'express'
import useWarehouse from '@services/useWarehouse'

class warehouseController {
  static createWarehouse: RequestHandler = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const warehouse = await useWarehouse.createWarehouse(req.body)
      if ('error' in warehouse) {
        res.status(400).json({ error: warehouse.error })
        return
      }

      res.status(201).json({
        message: 'Registro de almacén creado exitosamente',
        warehouse,
      })
    } catch {
      res.status(500).json({ error: 'Error interno del servidor' })
    }
  }

  static getWarehouses: RequestHandler = async (
    _req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const warehouses = await useWarehouse.getWarehouses()
      if ('error' in warehouses) {
        res.status(400).json({ error: warehouses.error })
        return
      }

      res.json(warehouses)
    } catch {
      res.status(500).json({ error: 'Error interno del servidor' })
    }
  }

  static updateWarehouse: RequestHandler = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const warehouse = await useWarehouse.updateWarehouse(
        req.params.id,
        req.body,
      )
      if ('error' in warehouse) {
        res.status(400).json({ error: warehouse.error })
        return
      }

      res.json({
        message: 'Registro de almacén actualizado',
        warehouse,
      })
    } catch {
      res.status(500).json({ error: 'Error interno del servidor' })
    }
  }

  static deleteWarehouse: RequestHandler = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const result = await useWarehouse.deleteWarehouse(req.params.id)
      if ('error' in result) {
        res.status(400).json({ error: result.error })
        return
      }

      res.json({ message: result.message })
    } catch {
      res.status(500).json({ error: 'Error interno del servidor' })
    }
  }
}

export default warehouseController
