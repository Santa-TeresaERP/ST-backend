import { Request, Response } from 'express'
import useStore from '@services/Store'

const updateStore = async (req: Request, res: Response) => {
  try {
    const updatedStore = await useStore.serviceUpdateStore(req.params.id, req.body)
    if (!updatedStore) {
      return res.status(404).json({ error: 'Store not found' })
    }
    if (updatedStore?.error) {
      return res.status(400).json({ error: updatedStore.error })
    }
    res.status(200).json({ message: 'Store updated', store: updatedStore })
  } catch (error) {
    console.error('Error updating store:', error)
    res.status(500).json({
      error: 'Internal Server Error',
      message: error instanceof Error ? error.message : 'Unknown error',
    })
  }
}

export default updateStore