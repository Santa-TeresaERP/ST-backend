import { Request, Response } from 'express'
import useWarehouseMovementProduct from '@services/warehouse_movement_product'

const controllerGetWarehouseMovementProducts = async (
  _req: Request,
  res: Response,
) => {
  try {
    const result =
      await useWarehouseMovementProduct.serviceGetwarehouseMovementProducts()
    res.json(result)
  } catch (error) {
    console.error('Error al obtener movimientos:', error) // Log en consola

    // Enviar el error también en la respuesta de Postman
    res.status(500).json({
      error: 'Error interno del servidor',
      message: error instanceof Error ? error.message : 'Error desconocido',
      stack: error instanceof Error ? error.stack : null, // Opcional, útil para debugging
    })
  }
}

export default controllerGetWarehouseMovementProducts
