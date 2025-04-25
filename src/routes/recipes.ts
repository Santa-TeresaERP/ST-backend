import express from 'express'
import authorization from '@middlewares/authorization'
import recipesController from '@controllers/recipes/index'

const router = express.Router()

router.post('/', authorization, recipesController.createRecipe)

router.get('/', authorization, recipesController.getRecipes)

router.get('/:recipeId', authorization, recipesController.getRecipesByID)

router.patch('/:recipeId', authorization, recipesController.updateRecipes)

router.delete('/:recipeId', authorization, recipesController.deleteRecipe)

export default router
