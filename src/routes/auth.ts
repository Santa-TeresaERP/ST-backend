import { Router } from 'express'
import authController from '@controllers/authController'
import authorization from '@middlewares/authorization'

const router = Router()

router.post('/login', authController.login)
router.get('/me', authorization, authController.getCurrentUser)

export default router
