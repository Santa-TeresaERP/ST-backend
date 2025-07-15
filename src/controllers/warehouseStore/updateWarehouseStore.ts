import { Request, Response } from 'express'
import useWarehouseStore from '@services/warehouseStore/index'

const updateWarehouseStoreController = async (req: Request, res: Response) => {
  try {
    const warehouseStore = await useWarehouseStore.serviceUpdateWarehouseStore(
      req.params.id,
      req.body,
    )
    if ('error' in warehouseStore) {
      res.status(404).json(warehouseStore)
    } else {
      res.status(200).json(warehouseStore)
    }
  } catch (error) {
    console.error('Error updating warehouse store:', error)

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

export default updateWarehouseStoreController
