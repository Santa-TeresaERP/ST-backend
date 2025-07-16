import { Request, Response } from 'express'
import useReturns from '@services/returns'

const CreateReturn = async (req: Request, res: Response) => {
  try {
    const result = await useReturns.serviceCreateReturn(req.body)
    if ('error' in result) {
      res.status(400).json({ error: result.error })
    }
    res
      .status(201)
      .json({ message: 'Devolución creada exitosamente', data: result })
  } catch {
    res.status(500).json({ error: 'Error interno al crear la devolución' })
  }
}

export default CreateReturn
