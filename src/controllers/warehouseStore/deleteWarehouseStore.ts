import { Request, Response } from 'express'
import useWarehouseStore from '@services/warehouseStore/index'

const deleteWarehouseStore = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const result = await useWarehouseStore.serviceDeleteWarehouseStore(id)

    if (result?.message) {
      res.status(404).json({ error: result.message })
    }

    res.status(200).json(result)
  } catch (error) {
    console.error('Error deleting warehouse store:', error)
    res.status(500).json({
      error: 'Internal Server Error',
      message: error instanceof Error ? error.message : 'Unknown error',
    })
  }
}

export default deleteWarehouseStore
