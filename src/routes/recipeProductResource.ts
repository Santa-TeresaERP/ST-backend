import express from 'express'
import authorization from '@middlewares/authorization'
import controller from '@controllers/recipes_resource'

const router = express.Router()

router.get('/', authorization, controller.GetRecipeProductResource)
router.post('/', authorization, controller.CreateRecipeProductResource)
router.patch('/:id', authorization, controller.UpdateRecipeProductResource)
router.delete('/:id', authorization, controller.DeleteRecipeProductResource)

export default router
