import { Request, Response } from 'express'
import useStore from '@services/Store'

const getStore = async (req: Request, res: Response) => {
  try {
    const store = await useStore.serviceGetStore(req.params.id)
    if (!store) {
      res.status(404).json({ error: 'Store not found' })
      return
    }
    res.status(200).json(store)
  } catch (error) {
    console.error('Error getting store:', error)
    res.status(500).json({
      error: 'Internal Server Error',
      message: error instanceof Error ? error.message : 'Unknown error',
    })
  }
}

export default getStore
