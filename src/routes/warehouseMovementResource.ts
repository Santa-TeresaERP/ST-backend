/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from 'express'
import authorization from '@middlewares/authorization'
import roleAuthorization from '@middlewares/roleAuthorization'
import warehouseMovementResourceController from '@controllers/WarehouseMovementResource'

const router = Router()

function asyncHandler(fn: any) {
  return function (req: any, res: any, next: any) {
    Promise.resolve(fn(req, res, next)).catch(next)
  }
}

// Crear movimiento de recurso
router.post(
  '/',
  authorization,
  roleAuthorization('canWrite', 'inventario'),
  asyncHandler(
    warehouseMovementResourceController.createWarehouseMovementResource,
  ),
)

// Obtener todos los movimientos
router.get(
  '/',
  authorization,
  roleAuthorization('canRead', 'inventario'),
  asyncHandler(
    warehouseMovementResourceController.getWarehouseMovementResources,
  ),
)

// Obtener movimiento por ID
router.get(
  '/:id',
  authorization,
  roleAuthorization('canRead', 'inventario'),
  asyncHandler(
    warehouseMovementResourceController.getWarehouseMovementResource,
  ),
)

// Actualizar movimiento
router.patch(
  '/:id',
  authorization,
  roleAuthorization('canEdit', 'inventario'),
  asyncHandler(
    warehouseMovementResourceController.updateWarehouseMovementResource,
  ),
)

// Eliminar movimiento
router.delete(
  '/:id',
  authorization,
  roleAuthorization('canDelete', 'inventario'),
  asyncHandler(
    warehouseMovementResourceController.deleteWarehouseMovementResource,
  ),
)

export default router
