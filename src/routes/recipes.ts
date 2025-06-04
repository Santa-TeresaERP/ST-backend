import authorization from '@middlewares/authorization'
import express from 'express'
import RecipeController from '@controllers/Recipe'

const router = express.Router()

router.post('/', authorization, RecipeController.recipeCreate)
router.get('/', authorization, RecipeController.recipeGet)
router.get('/byProduct/:id', authorization, RecipeController.getRecipesByProd)
router.delete('/:id', authorization, RecipeController.recipeDelete)
router.patch('/:id', authorization, RecipeController.updateRecipe)

export default router
