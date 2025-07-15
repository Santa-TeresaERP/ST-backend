import useWarehouse from '@services/warehouse/index'
import { Request, Response } from 'express'

const activateWarehouseController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const result = await useWarehouse.serviceActivateWarehouse(req.params.id)
    if ('error' in result) {
      res.status(400).json({ error: result.error })
      return
    }
    res.json({
      message: result.message,
      warehouse: result.warehouse,
    })
    return
  } catch (error) {
    console.error('Error reactivating warehouse:', error)
    res.status(500).json({ error: 'Error interno del servidor' })
    return
  }
}

export default activateWarehouseController
