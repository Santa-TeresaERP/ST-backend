import { Request, Response } from 'express'
import warehouseProductService from '@services/warehouse_product'

export default async function getByWarehouse(req: Request, res: Response) {
  try {
    const records =
      await warehouseProductService.getWarehouseProductsByWarehouse(
        req.params.warehouseId,
      )
    res.json(records)
  } catch (error: unknown) {
    console.error('Error getting warehouse products by warehouse:', error)
    let statusCode = 500
    let errorMessage = 'Unknown error occurred'

    if (error instanceof Error) {
      errorMessage = error.message
      statusCode = error.message.includes('no encontrado') ? 404 : 500
    }

    res.status(statusCode).json({
      error: statusCode === 404 ? 'Not Found' : 'Internal Server Error',
      message: errorMessage,
    })
  }
}
