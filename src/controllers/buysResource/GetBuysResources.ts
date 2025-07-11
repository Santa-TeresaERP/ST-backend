import { Request, Response } from 'express'
import useBuysResource from '@services/BuysResource'

const GetBuysResources = async (_req: Request, res: Response) => {
  try {
    const result = await useBuysResource.serviceGetBuysResources()

    if ('error' in result) {
      res.status(400).json({ error: result.error })
    }

    res.status(200).json(result)
  } catch {
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export default GetBuysResources
