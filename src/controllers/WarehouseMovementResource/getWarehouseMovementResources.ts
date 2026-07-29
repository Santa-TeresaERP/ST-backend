import { Request, Response } from 'express'
import useWarehouseMovementResource from '@services/warehouseMovementResource'

const getWarehouseMovementResources = async (_req: Request, res: Response) => {
  try {
    const records =
      await useWarehouseMovementResource.serviceGetWarehouseMovementResources()
    res.json(records)
  } catch (error) {
    console.error('Error al obtener movimientos de recursos:', error)
    res.status(500).json({
      error: 'Error interno del servidor',
      message: error instanceof Error ? error.message : 'Error desconocido',
      stack: error instanceof Error ? error.stack : null,
    })
  }
}

export default getWarehouseMovementResources
