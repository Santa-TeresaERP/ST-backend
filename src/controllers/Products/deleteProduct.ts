import index from '@services/Products/index'
import { Request, Response } from 'express'

const deleteProductController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const product = await index.deleteProduct(req.params.id)
    if ('error' in product) {
      res.status(400).json({ error: product.error })
    }
    res.json({ message: 'Producto eliminado' })
  } catch {
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}
export default deleteProductController
