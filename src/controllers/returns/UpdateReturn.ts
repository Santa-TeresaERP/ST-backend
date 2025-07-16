import { Request, Response } from 'express'
import useReturns from '@services/returns'

const UpdateReturn = async (req: Request, res: Response) => {
  try {
    const result = await useReturns.serviceUpdateReturn(req.params.id, req.body)
    if ('error' in result) {
      res.status(400).json({ error: result.error })
    }
    res
      .status(200)
      .json({ message: 'Devolución actualizada correctamente', data: result })
  } catch {
    res.status(500).json({ error: 'Error al actualizar la devolución' })
  }
}

export default UpdateReturn
