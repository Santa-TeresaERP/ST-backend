import express from 'express'
import authorization from '@middlewares/authorization'
import roleAuthorization from '@middlewares/roleAuthorization'
import productsController from '@controllers/Products/index'
import { uploadProductImage } from '@middlewares/uploadProductImage'

const router = express.Router()

// Crear producto con imagen
router.post(
  '/',
  authorization,
  roleAuthorization('canWrite', 'Produccion'),
  uploadProductImage,
  productsController.createProduct,
)

// Obtener todos los productos
router.get(
  '/',
  authorization,
  roleAuthorization('canRead', 'Produccion'),
  productsController.getAllProduct,
)

// Obtener producto por ID
router.get(
  '/:id',
  authorization,
  roleAuthorization('canRead', 'Produccion'),
  productsController.getProductByID,
)

// Actualizar producto con imagen
router.patch(
  '/:id',
  authorization,
  roleAuthorization('canEdit', 'Produccion'),
  uploadProductImage,
  productsController.updateProduct,
)

// Eliminar producto
router.delete(
  '/:id',
  authorization,
  roleAuthorization('canDelete', 'Produccion'),
  productsController.deleteProduct,
)

export default router
