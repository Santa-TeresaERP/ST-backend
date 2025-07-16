import { Request, Response } from 'express'
import useWarehouseStore from '@services/warehouseStore/index'

const getWarehouseStoreController = async (req: Request, res: Response) => {
  try {
    const warehouseStore = await useWarehouseStore.serviceGetWarehouseStore(
      req.params.id,
    )
    if ('error' in warehouseStore) {
      res.status(404).json(warehouseStore)
    } else {
      res.status(200).json(warehouseStore)
    }
  } catch (error) {
    console.error('Error fetching warehouse store:', error)

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

export default getWarehouseStoreController
