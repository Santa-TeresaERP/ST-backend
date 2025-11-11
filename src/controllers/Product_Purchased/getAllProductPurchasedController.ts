import { Request, Response } from 'express'
import productPurchasedService from '@services/almacen/productPurchased'

const getAllProductPurchasedController = async (
  _req: Request,
  res: Response,
) => {
  const result = await productPurchasedService.getAll()
  res.json(result)
}

export default getAllProductPurchasedController
