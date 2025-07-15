import express from 'express'
import authorization from '@middlewares/authorization'
import warehouseController from '@controllers/warehouse'

const router = express.Router()

router.post('/', authorization, warehouseController.CreateWarehouse)

router.get('/', authorization, warehouseController.GetWarehouses)

router.patch('/:id', authorization, warehouseController.UpdateWarehouse)

router.put('/:id', authorization, warehouseController.DeleteWarehouse)

router.patch(
  '/:id/activate',
  authorization,
  warehouseController.ActivateWarehouse,
)

export default router
