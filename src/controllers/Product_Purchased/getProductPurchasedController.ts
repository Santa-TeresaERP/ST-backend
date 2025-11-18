import productPurchasedService from '@services/Product_Purchased'
import { Request, Response } from 'express'

const getProductPurchasedController = async (_req: Request, res: Response) => {
  const result = await productPurchasedService.get()
  res.json(result)
}

export default getProductPurchasedController
