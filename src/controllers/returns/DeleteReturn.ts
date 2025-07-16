import { Request, Response } from 'express'
import useReturns from '@services/returns'

const DeleteReturn = async (req: Request, res: Response) => {
  try {
    const result = await useReturns.serviceDeleteReturn(req.params.id)
    if ('error' in result) {
      res.status(400).json({ error: result.error })
    }
    res.status(200).json(result)
  } catch {
    res.status(500).json({ error: 'Error al eliminar la devolución' })
  }
}

export default DeleteReturn
