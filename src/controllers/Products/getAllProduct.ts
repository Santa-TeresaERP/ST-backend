import index from '@services/Products/index'
import { Request, Response } from 'express'
const getAllProductController = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  try {
    const products = await index.getAllProduct()
    res.json(products)
    return
  } catch {
    res.status(500).json({ error: 'Error interno del servidor' })
    return
  }
}
export default getAllProductController
