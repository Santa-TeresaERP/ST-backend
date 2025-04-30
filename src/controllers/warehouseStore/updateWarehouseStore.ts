import { Request, Response } from 'express'
import useWarehouseStore from '@services/warehouseStore/index'

const updateWarehouseStore = async (req: Request, res: Response) => {
  try {
    const warehouseStore = await useWarehouseStore.serviceUpdateWarehouseStore(
      req.params.id,
      req.body,
    )
    if (!warehouseStore) {
      res.status(404).json({ error: 'Warehouse store not found' })
    }
    res.status(200).json({ message: 'Warehouse store updated', warehouseStore })
  } catch (error) {
    console.error('Error updating warehouse store:', error)
    res.status(500).json({
      error: 'Internal Server Error',
      message: error instanceof Error ? error.message : 'Unknown error',
    })
  }
}

export default updateWarehouseStore
