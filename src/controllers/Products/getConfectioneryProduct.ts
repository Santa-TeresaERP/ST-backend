import index from '@services/Products/index'
import { Request, Response } from 'express'

const getConfectioneryProductController = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  try {
    const confectioneryProducts = await index.getConfectioneriProduct()
    res.json(confectioneryProducts)
    return
  } catch {
    res.status(500).json({ error: 'Error interno del servidor' })
    return
  }
}

export default getConfectioneryProductController
