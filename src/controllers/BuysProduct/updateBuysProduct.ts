import { Request, Response } from 'express'
import useBuysProduct from '@services/BuysProduct'

const UpdateBuysProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    if (!id) {
      res.status(400).json({ error: 'ID es requerido' })
      return
    }

    console.log('Updating BuysProduct:', id, JSON.stringify(req.body, null, 2))

    const result = await useBuysProduct.serviceUpdateBuysProduct(id, req.body)

    if ('error' in result) {
      res.status(400).json({ error: result.error })
      return
    }

    res.status(200).json(result)
  } catch {
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export default UpdateBuysProduct
