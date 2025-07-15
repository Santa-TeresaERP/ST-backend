import { Request, Response } from 'express'
import useWarehouseStore from '@services/warehouseStore/index'

const deleteWarehouseStoreController = async (req: Request, res: Response) => {
  try {
    const result = await useWarehouseStore.serviceDeleteWarehouseStore(
      req.params.id,
    )
    if (result.error) {
      res.status(404).json(result)
    } else {
      res.status(200).json(result)
    }
  } catch (error) {
    console.error('Error deleting warehouse store:', error)

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

export default deleteWarehouseStoreController
