import express from 'express'
import authorization from '@middlewares/authorization'
import ReturnsController from '@controllers/returns'

const router = express.Router()

router.post('/', authorization, ReturnsController.CreateReturn)
router.get('/', authorization, ReturnsController.GetReturns)
router.get('/:id', authorization, ReturnsController.GetReturn)
router.patch('/:id', authorization, ReturnsController.UpdateReturn)
router.delete('/:id', authorization, ReturnsController.DeleteReturn)

export default router
