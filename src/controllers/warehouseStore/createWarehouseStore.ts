import { Request, Response } from 'express'
import useWarehouseStore from '@services/warehouseStore/index'

const createWarehouseStore = async (req: Request, res: Response) => {
  try {
    const warehouseStore = await useWarehouseStore.serviceCreateWarehouseStore(
      req.body,
    )
    res.status(201).json(warehouseStore)
  } catch (error) {
    console.error('Error creating warehouse store:', error)

    if (error instanceof Error) {
      res.status(500).json({
        error: 'Internal Server Error',
        message: error.message,
      })
    } else {
      res.status(500).json({
        error: 'Internal Server Error',
        message: 'Unknown error occurred',
      })
    }
  }
}

export default createWarehouseStore
