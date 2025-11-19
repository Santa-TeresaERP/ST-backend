import { Request, Response } from 'express'
import use from '@services/BuysProduct'

const Gets = async (_req: Request, res: Response) => {
  try {
  const result = await use.serviceGetBuysProducts()

    if ('error' in result) {
      res.status(400).json({ error: result.error })
    }

    res.status(200).json(result)
  } catch {
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export default Gets
