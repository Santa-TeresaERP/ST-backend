import express from 'express'
import authorization from '@middlewares/authorization'
import productsController from '@controllers/productController'

const router = express.Router()

router.post('/', authorization, productsController.createProduct)

router.get('/', authorization, productsController.getProducts)

router.patch('/:id', authorization, productsController.updateProduct)

router.delete('/:id', authorization, productsController.deleteProduct)

export default router
