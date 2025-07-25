import express from 'express'
import authorization from '@middlewares/authorization'
import roleAuthorization from '@middlewares/roleAuthorization'
import categoriesController from '@controllers/categoriesController'

const router = express.Router()

// Crear categoría
router.post(
  '/',
  authorization,
  roleAuthorization('canWrite', 'Produccion'),
  categoriesController.createCategory,
)

// Obtener todas las categorías
router.get(
  '/',
  authorization,
  roleAuthorization('canRead', 'Produccion'),
  categoriesController.getCategories,
)

// Obtener una categoría por ID
router.get(
  '/:id',
  authorization,
  roleAuthorization('canRead', 'Produccion'),
  categoriesController.getCategory,
)

// Actualizar una categoría
router.patch(
  '/:id',
  authorization,
  roleAuthorization('canEdit', 'Produccion'),
  categoriesController.updateCategory,
)

// Eliminar una categoría
router.put(
  '/:id',
  authorization,
  roleAuthorization('canDelete', 'Produccion'),
  categoriesController.deleteCategory,
)

export default router
