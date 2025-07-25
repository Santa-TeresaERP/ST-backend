import express from 'express'
import authorization from '@middlewares/authorization'
import roleAuthorization from '@middlewares/roleAuthorization'
import RecipeController from '@controllers/Recipe'

const router = express.Router()

// Crear receta
router.post(
  '/',
  authorization,
  roleAuthorization('canWrite', 'produccion'),
  RecipeController.recipeCreate,
)

// Obtener todas las recetas
router.get(
  '/',
  authorization,
  roleAuthorization('canRead', 'produccion'),
  RecipeController.recipeGet,
)

// Obtener recetas por producto
router.get(
  '/byProduct/:id',
  authorization,
  roleAuthorization('canRead', 'produccion'),
  RecipeController.getRecipesByProd,
)

// Eliminar receta
router.delete(
  '/:id',
  authorization,
  roleAuthorization('canDelete', 'produccion'),
  RecipeController.recipeDelete,
)

// Actualizar receta
router.patch(
  '/:id',
  authorization,
  roleAuthorization('canEdit', 'produccion'),
  RecipeController.updateRecipe,
)

export default router
