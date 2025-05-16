import express from 'express'
import authorization from '@middlewares/authorization'
import productsController from '@controllers/Products/index'

const router = express.Router()

router.post('/', authorization, productsController.createProduct)
router.get('/', authorization, productsController.getAllProduct)
router.get('/:id', authorization, productsController.getProductByID)
router.patch('/:id', authorization, productsController.updateProduct)
router.delete('/:id', authorization, productsController.deleteProduct)

export default router
