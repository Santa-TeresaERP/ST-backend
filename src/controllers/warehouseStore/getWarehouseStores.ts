import { Request, Response } from 'express'
import useWarehouseStore from '@services/warehouseStore/index'

const getWarehouseStores = async (_req: Request, res: Response) => {
  try {
    const warehouseStores = await useWarehouseStore.serviceGetWarehouseStores()
    res.status(200).json(warehouseStores)
  } catch (error) {
    console.error('Error getting warehouse stores:', error)
    res.status(500).json({
      error: 'Internal Server Error',
      message: error instanceof Error ? error.message : 'Unknown error',
    })
  }
}

export default getWarehouseStores
