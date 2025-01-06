import express from 'express'
import authorization from '@middlewares/authorization'
import resourceController from '@controllers/resourceController'

const router = express.Router()

router.post('/', authorization, resourceController.createResource)

router.get('/', authorization, resourceController.getResources)

router.delete('/:id', authorization, resourceController.deleteResource)

router.patch('/:id', authorization, resourceController.updateResource)

export default router
