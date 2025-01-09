import express from 'express'
import authorization from '@middlewares/authorization'
import categoriesController from '@controllers/categoriesController'

const router = express.Router()

router.post('/', authorization, categoriesController.createCategory)

router.get('/', authorization, categoriesController.getCategories)

router.patch('/:id', authorization, categoriesController.updateCategory)

router.delete('/:id', authorization, categoriesController.deleteCategory)

export default router
