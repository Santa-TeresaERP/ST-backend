import { Router } from 'express'
import warehouseMovementResourceController from '@controllers/WarehouseMovementResource'

const router = Router()

router.post(
  '/',
  warehouseMovementResourceController.createWarehouseMovementResource,
)
router.get(
  '/',
  warehouseMovementResourceController.getWarehouseMovementResources,
)
router.get(
  '/:id',
  warehouseMovementResourceController.getWarehouseMovementResource,
)
router.put(
  '/:id',
  warehouseMovementResourceController.updateWarehouseMovementResource,
)
router.delete(
  '/:id',
  warehouseMovementResourceController.deleteWarehouseMovementResource,
)

export default router
