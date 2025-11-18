import productPurchasedService from '@services/Product_Purchased'
import { Request, Response } from 'express'

const getProductPurchasedByIdController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { id } = req.params
  const result = await productPurchasedService.getById(id)

  if ('error' in result) {
    // Si el producto no se encuentra, devolvemos 404 Not Found
    res.status(404).json({ error: result.error })
    return
  }

  res.json(result)
}

export default getProductPurchasedByIdController
