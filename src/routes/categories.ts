import express from 'express'
import authorization from '@middlewares/authorization'
import categoriesController from '@controllers/categoriesController'

const router = express.Router()

// Crear una categoría
router.post('/', authorization, categoriesController.createCategory)

// Obtener todas las categorías
router.get('/', authorization, categoriesController.getCategories)

// Actualizar una categoría por ID
router.patch('/:id', authorization, categoriesController.updateCategory)

// Eliminar una categoría por ID
router.delete('/:id', authorization, categoriesController.deleteCategory)

export default router
