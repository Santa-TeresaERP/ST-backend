import useWarehouseMovementProduct from '@services/warehouse_movement_product'
import { Request, Response } from 'express'

const deleteWarehouseMovementProductController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const movement =
      await useWarehouseMovementProduct.serviceDeletewarehouseMovementProduct(
        req.params.id,
      )
    if ('error' in movement) {
      res.status(400).json({ error: movement.error })
      return
    }
    res.json({ message: 'Movimiento de producto eliminado exitosamente' })
    return
  } catch {
    res.status(500).json({ error: 'Error interno del servidor' })
    return
  }
}

export default deleteWarehouseMovementProductController
