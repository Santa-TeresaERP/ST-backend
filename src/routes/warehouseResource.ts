import { Router } from 'express'
import warehouseResourceController from '@controllers/WarehouseResource'

const router = Router()

router.get('/', warehouseResourceController.GetWarehouseResources)
router.post('/', warehouseResourceController.CreateWarehouseResource)
router.put('/:id', warehouseResourceController.UpdateWarehouseResource)
router.delete('/:id', warehouseResourceController.DeleteWarehouseResource)

export default router
