import { Router } from 'express'
import controller from '@controllers/recipes_conection'

const router = Router()

router.get('/', controller.GetRecipeConectionResource)
router.post('/', controller.CreateRecipeConectionResource)
router.put('/:recipe_id/:resource_id', controller.UpdateRecipeConectionResource)
router.delete(
  '/:recipe_id/:resource_id',
  controller.DeleteRecipeConectionResource,
)

export default router
