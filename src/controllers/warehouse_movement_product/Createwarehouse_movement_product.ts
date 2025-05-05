import { Request, Response } from 'express'
import useWarehouseMovementProduct from '@services/warehouse_movement_product'

const createWarehouseMovementProductController = async (
  req: Request,
  res: Response,
) => {
  try {
    const movement =
      await useWarehouseMovementProduct.serviceCreatewarehouseMovementProduct(
        req.body,
      )
    if ('error' in movement) {
      res.status(400).json({ error: movement.error })
      return
    }
    res
      .status(201)
      .json({ message: 'Movimiento de producto creado exitosamente', movement })
    return
  } catch {
    res.status(500).json({ error: 'Error interno del servidor' })
    return
  }
}

export default createWarehouseMovementProductController
