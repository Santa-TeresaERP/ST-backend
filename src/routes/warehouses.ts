import express from 'express'
import authorization from '@middlewares/authorization'
import warehouseController from '@controllers/warehouse'

const router = express.Router()

router.post('/', authorization, warehouseController.CreateWarehouse)

router.get('/', authorization, warehouseController.GetWarehouses)

router.put('/:id', authorization, warehouseController.UpdateWarehouse)

router.patch('/:id', authorization, warehouseController.DeleteWarehouse)

export default router
