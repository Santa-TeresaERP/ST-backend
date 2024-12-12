import express from 'express'
import { createProduct, deleteProduct, getProducts, updateProduct } from '../controllers/productController.js'
import authorization from '../middlewares/authorization'

const router = express.Router()

router.post('/:type', authorization, createProduct)

router.get('/', authorization, getProducts)

router.delete('/:type/:id', authorization, deleteProduct)

router.patch('/:type/:id', authorization, updateProduct)

export default router
