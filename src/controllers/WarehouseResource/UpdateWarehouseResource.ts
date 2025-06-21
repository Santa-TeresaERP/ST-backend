import { Request, Response } from 'express'
import useBuysResource from '@services/BuysResource'

const UpdateBuysResource = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const result = await useBuysResource.serviceUpdateBuysResource(id, req.body)

    if ('error' in result) {
      res.status(400).json({ error: result.error })
    }

    res
      .status(200)
      .json({ message: 'Recurso de almacén actualizado', resource: result })
  } catch {
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export default UpdateBuysResource
