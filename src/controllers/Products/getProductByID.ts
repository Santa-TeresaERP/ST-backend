import index from '@services/Products/index'
import { Request, Response } from 'express'
const getProductByIDController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const product = await index.getProductByID(req.params.id)
    res.json(product)
    return
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message })
    } else {
      res.status(400).json({ error: 'Unknown error' })
    }
    return
  }
}
export default getProductByIDController
