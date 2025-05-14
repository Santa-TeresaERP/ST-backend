import { Request, Response } from 'express'
import warehouseProductService from '@services/warehouse_product'

export default async function create(req: Request, res: Response) {
  try {
    const record = await warehouseProductService.createWarehouseProduct(
      req.body,
    )
    res.status(201).json(record)
  } catch (error: unknown) {
    console.error('Error creating warehouse product record:', error)
    let errorMessage = 'Unknown error occurred'
    let statusCode = 500

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
