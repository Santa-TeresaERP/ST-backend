import { Router } from 'express'
import controller from '@controllers/recipes_conection'

const router = Router()

// Obtener todas las conexiones receta-recurso
router.get('/', controller.GetRecipeConectionResource)

// Crear una nueva conexión receta-recurso
router.post('/', controller.CreateRecipeConectionResource)

// Actualizar una conexión receta-recurso
router.put('/:recipe_id/:resource_id', controller.UpdateRecipeConectionResource)

// Eliminar una conexión receta-recurso
router.delete(
  '/:recipe_id/:resource_id',
  controller.DeleteRecipeConectionResource,
)

export default router
