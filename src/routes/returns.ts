import { Router } from 'express'
import authorization from '@middlewares/authorization'
import returnsController from '@controllers/returnsController'

const router: Router = Router()

router.post('/', authorization, returnsController.createReturn)
router.get('/', authorization, returnsController.getReturns)
router.delete('/:id', authorization, returnsController.deleteReturn)
router.patch('/:id', authorization, returnsController.updateReturn)

export default router
