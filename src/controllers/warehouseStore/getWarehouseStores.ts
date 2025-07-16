import { Request, Response } from 'express'
import useWarehouseStore from '@services/warehouseStore/index'

const getWarehouseStoresController = async (_req: Request, res: Response) => {
  try {
    const warehouseStores = await useWarehouseStore.serviceGetWarehouseStores()
    res.status(200).json(warehouseStores)
  } catch (error) {
    console.error('Error fetching warehouse stores:', error)

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

export default getWarehouseStoresController
