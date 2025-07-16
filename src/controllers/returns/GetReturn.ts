import { Request, Response } from 'express'
import useReturns from '@services/returns'

const GetReturn = async (req: Request, res: Response) => {
  try {
    const result = await useReturns.serviceGetReturn(req.params.id)
    if ('error' in result) {
      res.status(404).json({ error: result.error })
    }
    res.status(200).json(result)
  } catch {
    res.status(500).json({ error: 'Error al obtener la devolución' })
  }
}

export default GetReturn
