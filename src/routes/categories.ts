import express from 'express'
import authorization from '@middlewares/authorization'
import categoriesController from '@controllers/categoriesController'

const router = express.Router()

router.post(
  '/api/categories',
  authorization,
  categoriesController.createCategory,
)

router.get('/api/categories', authorization, categoriesController.getCategories)

router.patch(
  '/api/categories/:id',
  authorization,
  categoriesController.updateCategory,
)

router.delete(
  '/api/categories/:id',
  authorization,
  categoriesController.deleteCategory,
)

export default router
