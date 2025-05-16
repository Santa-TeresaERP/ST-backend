import express from 'express'
import authorization from '@middlewares/authorization'
import resourceController from '@controllers/Resource'

const router = express.Router()

router.post('/', authorization, resourceController.CreateResource)
router.get('/', authorization, resourceController.GetResource)
router.patch('/:id', authorization, resourceController.UpdateResource)
router.delete('/:id', authorization, resourceController.DeleteResource)

export default router
