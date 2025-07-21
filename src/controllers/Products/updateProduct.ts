import index from '@services/Products/index'
import { Request, Response } from 'express'

const updateProductController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const product = await index.updateProduct(req.params.id, req.body, req.file); // <--- aquí pasas req.file
    if ('error' in product) {
      res.status(400).json({ error: product.error });
      return;
    }
    res.json({ message: 'Producto actualizado', product });
  } catch {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}
export default updateProductController
