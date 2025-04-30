import express from 'express'
import authorization from '@middlewares/authorization'
import warehouseStoreController from '@controllers/warehouseStore/index'

const router = express.Router()

router.post('/', authorization, warehouseStoreController.createWarehouseStore)

router.get('/', authorization, warehouseStoreController.getWarehouseStores)

router.put('/:id', authorization, warehouseStoreController.updateWarehouseStore)

router.delete(
  '/:id',
  authorization,
  warehouseStoreController.deleteWarehouseStore,
)

export default router
