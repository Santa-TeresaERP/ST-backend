import express from 'express'
import authorization from '@middlewares/authorization'
import lostController from '@controllers/Lost'

const router = express.Router()
router.post('/', authorization, lostController.createLost)
router.get('/', authorization, lostController.getAllLost)
router.get('/:id', authorization, lostController.getLostById)
router.patch('/:id', authorization, lostController.updateLost)
router.delete('/:id', authorization, lostController.deleteLost)

export default router
