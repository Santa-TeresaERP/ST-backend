import { Request, Response } from 'express'
import useWarehouseMovementProduct from '@services/warehouse_movement_product'

const controllerUpdateWarehouseMovementProduct = async (
  req: Request,
  res: Response,
) => {
  const { id } = req.params
  const result =
    await useWarehouseMovementProduct.serviceUpdatewarehouseMovementProduct(
      id,
      req.body,
    )

  if ('error' in result) {
    res.status(400).json({ error: result.error })
    return
  }

  res.json(result)
}

export default controllerUpdateWarehouseMovementProduct
