import { Router } from 'express'
import warehouseMovementResourceController from '@controllers/WarehouseMovementResource'

const router = Router()

function asyncHandler(fn: any) {
  return function (req: any, res: any, next: any) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

router.post(
  '/',
  asyncHandler(warehouseMovementResourceController.createWarehouseMovementResource),
)
router.get(
  '/',
  asyncHandler(warehouseMovementResourceController.getWarehouseMovementResources),
)
router.get(
  '/:id',
  asyncHandler(warehouseMovementResourceController.getWarehouseMovementResource),
)
router.patch(
  '/:id',
  asyncHandler(warehouseMovementResourceController.updateWarehouseMovementResource),
)
router.delete(
  '/:id',
  asyncHandler(warehouseMovementResourceController.deleteWarehouseMovementResource),
)

export default router
