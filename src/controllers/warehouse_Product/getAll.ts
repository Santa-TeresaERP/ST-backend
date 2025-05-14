import { Request, Response } from 'express'
import warehouseProductService from '@services/warehouse_product'

export default async function getAll(req: Request, res: Response) {
  try {
    const records = await warehouseProductService.getAllWarehouseProducts()
    res.json(records)
  } catch (error: unknown) {
    console.error('Error getting warehouse products:', error)
    res.status(500).json({
      error: 'Internal Server Error',
      message:
        error instanceof Error ? error.message : 'Unknown error occurred',
    })
  }
}
