import { Router } from 'express'
import warehouseMovementResourceController from '@controllers/WarehouseMovementResource'

const router = Router()

// Crear un nuevo movimiento de recurso en almacén
router.post(
  '/',
  warehouseMovementResourceController.createWarehouseMovementResource,
)

// Obtener todos los movimientos de recursos
router.get(
  '/',
  warehouseMovementResourceController.getWarehouseMovementResources,
)

// Obtener un movimiento de recurso por ID
router.get(
  '/:id',
  warehouseMovementResourceController.getWarehouseMovementResource,
)

// Actualizar un movimiento de recurso
router.put(
  '/:id',
  warehouseMovementResourceController.updateWarehouseMovementResource,
)

// Eliminar un movimiento de recurso
router.delete(
  '/:id',
  warehouseMovementResourceController.deleteWarehouseMovementResource,
)

export default router
