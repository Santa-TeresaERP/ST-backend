import express from 'express'
import authorization from '@middlewares/authorization'
import roleAuthorization from '@middlewares/roleAuthorization'
import index from '@controllers/warehouse_movement_product'

const router = express.Router()

// Crear un movimiento de producto
router.post(
  '/',
  authorization,
  roleAuthorization('canWrite', 'inventario'),
  index.CreateWarehouseMovementProduct,
)

// Obtener todos los movimientos de productos
router.get(
  '/',
  authorization,
  roleAuthorization('canRead', 'inventario'),
  index.GetWarehouseMovementProducts,
)

// Actualizar un movimiento de producto por ID
router.patch(
  '/:id',
  authorization,
  roleAuthorization('canEdit', 'inventario'),
  index.UpdateWarehouseMovementProduct,
)

// Eliminar un movimiento de producto por ID
router.delete(
  '/:id',
  authorization,
  roleAuthorization('canDelete', 'inventario'),
  index.DeleteWarehouseMovementProduct,
)

export default router
