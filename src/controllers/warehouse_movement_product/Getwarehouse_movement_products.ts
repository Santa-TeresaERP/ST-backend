import { Request, Response } from 'express'
import useWarehouseMovementProduct from '@services/warehouse_movement_product'

const controllerGetWarehouseMovementProducts = async (
  _req: Request,
  res: Response,
) => {
  try {
    const result =
      await useWarehouseMovementProduct.serviceGetwarehouseMovementProducts()
    res.json(result)
  } catch {
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export default controllerGetWarehouseMovementProducts
