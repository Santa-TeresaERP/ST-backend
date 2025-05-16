import { Request, Response } from 'express'
import warehouseProductService from '@services/warehouse_product'

export default async function update(req: Request, res: Response) {
  try {
    const updatedRecord = await warehouseProductService.updateWarehouseProduct(
      req.params.id,
      req.body,
    )
    res.json(updatedRecord)
  } catch (error: unknown) {
    console.error('Error updating warehouse product:', error)
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
