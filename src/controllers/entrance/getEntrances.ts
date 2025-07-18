import { Request, Response } from 'express'
import useEntrance from '@services/entrance'

const getEntrancesController = async (_req: Request, res: Response) => {
  try {
    const result = await useEntrance.serviceGetEntrances()
    res.status(200).json(result)
  } catch (error) {
    console.error('Error getting entrances:', error)
    res.status(500).json({
      error: 'Internal Server Error',
      message:
        error instanceof Error ? error.message : 'Unknown error occurred',
    })
  }
}

export default getEntrancesController
