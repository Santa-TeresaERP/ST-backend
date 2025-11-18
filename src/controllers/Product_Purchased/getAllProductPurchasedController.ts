import productPurchasedService from '@services/Product_Purchased'
import { Request, Response } from 'express'

const getAllProductPurchasedController = async (
  _req: Request,
  res: Response,
) => {
  const result = await productPurchasedService.getAll()
  res.json(result)
}

export default getAllProductPurchasedController
