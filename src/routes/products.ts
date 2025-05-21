import express from 'express'
import authorization from '@middlewares/authorization'
import upload from '@middlewares/upload' // Asegúrate de importarlo
import productsController from '@controllers/Products/index'

const router = express.Router()

// ¡Importante! primero upload.single('imagen'), luego authorization
router.post(
  '/',
  upload.single('imagen'),
  authorization,
  productsController.createProduct,
)

router.get('/', authorization, productsController.getAllProduct)

router.get(
  '/confectionery',
  authorization,
  productsController.getConfectioneryProduct,
)

router.get('/:id', authorization, productsController.getProductByID)

router.patch('/:id', authorization, productsController.updateProduct)

router.delete('/:id', authorization, productsController.deleteProduct)

export default router
