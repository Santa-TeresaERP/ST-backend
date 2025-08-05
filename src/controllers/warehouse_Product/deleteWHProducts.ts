import { Request, Response } from 'express'
import warehouseProductService from '@services/warehouse_product'

export default async function toggleWarehouseProductStatus(
  req: Request,
  res: Response,
) {
  try {
    const product = await warehouseProductService.deleteWarehouseProduct(req.params.id)
    res.json({ 
      message: `Estado del producto actualizado a ${product.status ? 'activo' : 'inactivo'}`,
      product
    })
  } catch (error: unknown) {
    console.error('Error updating warehouse product status:', error)
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
