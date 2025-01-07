import express from 'express'
import authorization from '@middlewares/authorization'
import productsController from '@controllers/productsController'

const router = express.Router()

// Crear un producto
router.post('/', authorization, productsController.createProduct)

// Obtener todos los productos
router.get('/', authorization, productsController.getProducts)

// Actualizar un producto por ID
router.patch('/:id', authorization, productsController.updateProduct)

// Eliminar un producto por ID
router.delete('/:id', authorization, productsController.deleteProduct)

export default router
