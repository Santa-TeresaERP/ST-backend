import { Request, Response } from 'express'
import productPurchasedService from '@services/almacen/productPurchased'

const getProductPurchasedController = async (_req: Request, res: Response) => {
  const result = await productPurchasedService.get()
  res.json(result)
}

export default getProductPurchasedController
