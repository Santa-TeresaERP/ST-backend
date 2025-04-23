import { Request, Response } from 'express'
import index from '@services/Products/index'

const createProductController = async (req: Request, res: Response) => {
  try {
    const product = await index.createProduct(req.body)
    if ('error' in product) {
      res.status(400).json({ error: product.error })
      return
    }
    res.status(201).json({ message: 'Producto creado exitosamente', product })
    return
  } catch {
    res.status(500).json({ error: 'Error interno del servidor' })
    return
  }
}
export default createProductController
