import productPurchasedService from '@services/Product_Purchased'
import { Request, Response } from 'express'

const createProductPurchasedController = async (
  req: Request,
  res: Response,
) => {
  const result = await productPurchasedService.create(req.body)

  if ('error' in result) {
    // Si hay un error de validación, devolvemos un 400 Bad Request
    res.status(400).json({ error: result.error })
  }

  // Para creación exitosa, es una buena práctica devolver 201 Created
  res.status(201).json(result)
}

export default createProductPurchasedController
