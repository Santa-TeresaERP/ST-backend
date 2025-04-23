import index from '@services/Products/index'
import { Request, Response } from 'express'
const updateProductController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const product = await index.updateProduct(req.params.id, req.body)
    if ('error' in product) {
      res.status(400).json({ error: product.error })
      return // Asegúrate de retornar después de enviar la respuesta
    }
    res.json({ message: 'Producto actualizado', product })
  } catch {
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}
export default updateProductController
