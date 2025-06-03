import express from 'express'
import authorization from '@middlewares/authorization'
import productsController from '@controllers/Products/index'
import { uploadProductImage } from '@middlewares/uploadProductImage'

const router = express.Router()

router.post(
  '/',
  authorization,
  uploadProductImage, // Middleware para subir imagen
  productsController.createProduct,
)

// Resto de las rutas permanecen igual...
router.get('/', authorization, productsController.getAllProduct)
router.get('/:id', authorization, productsController.getProductByID)
router.patch('/:id', authorization, productsController.updateProduct)
router.delete('/:id', authorization, productsController.deleteProduct)

export default router
