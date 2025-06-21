import { Request, Response } from 'express'
import useBuysResource from '@services/BuysResource'

const DeleteBuysResource = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const result = await useBuysResource.serviceDeleteBuysResource(id)

    if ('error' in result) {
      res.status(400).json({ error: result.error })
    }

    res.status(200).json(result)
  } catch {
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export default DeleteBuysResource
