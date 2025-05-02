import express from 'express'
import authorization from '@middlewares/authorization'
import warehouseMovementProductController from '@controllers/warehouse_movement_product'

const router = express.Router()

// Crear un movimiento de producto
router.post(
  '/',
  authorization,
  warehouseMovementProductController.CreateWarehouseMovementProduct,
)

// Obtener todos los movimientos de productos
router.get(
  '/',
  authorization,
  warehouseMovementProductController.GetWarehouseMovementProducts,
)

// Actualizar un movimiento de producto por ID
router.patch(
  '/:id',
  authorization,
  warehouseMovementProductController.UpdateWarehouseMovementProduct,
)

// Eliminar un movimiento de producto por ID
router.delete(
  '/:id',
  authorization,
  warehouseMovementProductController.DeleteWarehouseMovementProduct,
)

export default router
