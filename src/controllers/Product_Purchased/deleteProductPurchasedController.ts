import { Request, Response } from 'express'
import productPurchasedService from '@services/almacen/productPurchased'

const deleteProductPurchasedController = async (
  req: Request,
  res: Response,
) => {
  const { id } = req.params
  const result = await productPurchasedService.delete(id)

  if ('error' in result) {
    // Si el producto a eliminar no se encuentra, devolvemos 404
    return res.status(404).json({ error: result.error })
  }

  res.json(result)
}

export default deleteProductPurchasedController
