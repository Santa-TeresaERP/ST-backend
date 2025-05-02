import express from 'express'
import authorization from '@middlewares/authorization'
import productsController from '@controllers/Products/index'

const router = express.Router()

// Rutas de productos
router.post('/api/products', authorization, productsController.createProduct)
router.get('/api/products', authorization, productsController.getAllProduct)
router.get(
  '/api/products/confectionery',
  authorization,
  productsController.getConfectioneryProduct,
)
router.get(
  '/api/products/:id',
  authorization,
  productsController.getProductByID,
)
router.patch(
  '/api/products/:id',
  authorization,
  productsController.updateProduct,
)
router.delete(
  '/api/products/:id',
  authorization,
  productsController.deleteProduct,
)

export default router
