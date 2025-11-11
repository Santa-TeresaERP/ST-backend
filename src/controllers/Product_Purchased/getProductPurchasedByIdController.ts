import { Request, Response } from 'express'
import productPurchasedService from '@services/almacen/productPurchased'

const getProductPurchasedByIdController = async (
  req: Request,
  res: Response,
) => {
  const { id } = req.params
  const result = await productPurchasedService.getById(id)

  if ('error' in result) {
    // Si el producto no se encuentra, devolvemos 404 Not Found
    return res.status(404).json({ error: result.error })
  }

  res.json(result)
}

export default getProductPurchasedByIdController
