import { Request, Response } from 'express'
import warehouseProductService from '@services/warehouse_product'

export default async function getAll(
  _req: Request,
  res: Response,
): Promise<void> {
  try {
    const warehouseProducts =
      await warehouseProductService.getAllWarehouseProducts()

    if (!warehouseProducts || warehouseProducts.length === 0) {
      res.status(200).json({
        success: true,
        message: 'No warehouse products found',
        data: [],
      })
      return
    }

    res.status(200).json({
      success: true,
      message: 'Warehouse products retrieved successfully',
      data: warehouseProducts,
    })
  } catch (error: unknown) {
    console.error('Error retrieving warehouse products:', error)

    const statusCode =
      error instanceof Error && error.message.includes('not found') ? 404 : 500
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'Failed to retrieve warehouse products'

    res.status(statusCode).json({
      success: false,
      message: errorMessage,
      data: null,
    })
  }
}
