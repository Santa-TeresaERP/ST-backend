import { Request, Response } from 'express'
import useStore from '@services/Store'

const deleteStore = async (req: Request, res: Response) => {
  try {
    const result = await useStore.serviceDeleteStore(req.params.id)
    if (!result) {
      res.status(404).json({ error: 'Store not found' })
      return
    }
    res.status(200).json(result)
    return
  } catch (error) {
    console.error('Error deleting store:', error)
    res.status(500).json({
      error: 'Internal Server Error',
      message: error instanceof Error ? error.message : 'Unknown error',
    })
  }
}

export default deleteStore
