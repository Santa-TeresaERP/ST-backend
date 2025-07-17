import { Request, Response } from 'express'
import useStore from '@services/Store'

const createStore = async (req: Request, res: Response): Promise<void> => {
  try {
    const store = await useStore.serviceCreateStore(req.body)
    if ('error' in store) {
      res.status(400).json({ error: store.error })
      return // ← AGREGAR RETURN para detener la ejecución
    }
    res.status(201).json(store)
  } catch (error) {
    console.error('Error creating store:', error)
    res.status(500).json({
      error: 'Internal Server Error',
      message: error instanceof Error ? error.message : 'Unknown error',
    })
  }
}

export default createStore
