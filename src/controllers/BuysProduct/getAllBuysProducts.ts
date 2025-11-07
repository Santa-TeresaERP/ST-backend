import { Request, Response } from 'express'
import useBuysProduct from '@services/BuysProduct'

const GetAllBuysProducts = async (_req: Request, res: Response) => {
  try {
    const result = await useBuysProduct.serviceGetAllBuysProducts()

    if ('error' in result) {
      res.status(400).json({ error: result.error })
    }

    res.status(200).json(result)
  } catch {
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export default GetAllBuysProducts
