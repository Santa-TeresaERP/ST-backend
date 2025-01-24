import express from 'express'
import authorization from '@middlewares/authorization'
import productsController from '@controllers/productsController'

const router = express.Router()

router.post('/', authorization, productsController.createProduct)

router.get('/', authorization, productsController.getProducts)

router.get('/confectionery', authorization, productsController.getConfectionery)

router.get('/:id', authorization, productsController.getProduct)

router.patch('/:id', authorization, productsController.updateProduct)

router.delete('/:id', authorization, productsController.deleteProduct)

export default router
