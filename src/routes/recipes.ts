import express from 'express'
import authorization from '@middlewares/authorization'
import createRecipe from '@controllers/recipes/createRecipe'
import getRecipes from '@controllers/recipes/getRecipes'
import getRecipesByID from '@controllers/recipes/getRecipesByID'
import updateRecipesController from '@controllers/recipes/updateRecipes'
import deleteRecipe from '@controllers/recipes/deleteRecipe'

const router = express.Router()

router.post('/', authorization, createRecipe)

router.get('/', authorization, getRecipes)

router.get('/:recipeId', authorization, getRecipesByID)

router.patch('/:recipeId', authorization, updateRecipesController)

router.delete('/:recipeId', authorization, deleteRecipe)

export default router
