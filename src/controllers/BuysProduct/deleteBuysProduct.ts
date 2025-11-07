import { Request, Response } from 'express'
import useBuysProduct from '@services/BuysProduct'

const DeleteBuysProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    if (!id) {
      res.status(400).json({ error: 'ID es requerido' })
      return
    }

    const result = await useBuysProduct.serviceDeleteBuysProduct(id)

    if ('error' in result) {
      res.status(400).json({ error: result.error })
      return
    }

    res.status(200).json(result)
  } catch {
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export default DeleteBuysProduct
