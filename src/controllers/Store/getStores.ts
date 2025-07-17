import { Request, Response } from 'express'
import useStore from '@services/Store'

const getStores = async (_req: Request, res: Response) => {
  try {
    const stores = await useStore.serviceGetStores()
    res.status(200).json(stores)
  } catch (error) {
    console.error('Error getting stores:', error)
    res.status(500).json({
      error: 'Internal Server Error',
      message: error instanceof Error ? error.message : 'Unknown error',
    })
  }
}

export default getStores
