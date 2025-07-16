import express from 'express'
import authorization from '@middlewares/authorization'
import storeController from '@controllers/Store/index'

const router = express.Router()

router.post('/', authorization, storeController.createStore)
router.get('/', authorization, storeController.getStores)
router.get('/:id', authorization, storeController.getStore)
router.patch('/:id', authorization, storeController.updateStore)
router.delete('/:id', authorization, storeController.deleteStore)

export default router
