import productPurchasedService from '@services/Product_Purchased'
import { Request, Response } from 'express'

const updateProductPurchasedController = async (
  req: Request,
  res: Response,
) => {
  const { id } = req.params
  const result = await productPurchasedService.update(id, req.body)

  if ('error' in result) {
    // El error puede ser por validación (400) o por no encontrarlo (404)
    return res.status(400).json({ error: result.error })
  }

  res.json(result)
}

export default updateProductPurchasedController
