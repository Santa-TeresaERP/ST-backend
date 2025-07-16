import { Request, Response } from 'express'
import useReturns from '@services/returns'

const GetReturns = async (_req: Request, res: Response) => {
  try {
    const result = await useReturns.serviceGetReturns()
    if ('error' in result) {
      res.status(400).json({ error: result.error })
    }
    res.status(200).json(result)
  } catch {
    res.status(500).json({ error: 'Error al obtener devoluciones' })
  }
}

export default GetReturns
