import { Router } from 'express'
import controller from '@controllers/recipes_resource'

const router = Router()

router.get('/', controller.GetRecipeProductResource)
router.post('/', controller.CreateRecipeProductResource)
router.put('/:id/:product_id', controller.UpdateRecipeProductResource)
router.delete('/:id/:product_id', controller.DeleteRecipeProductResource)

export default router
