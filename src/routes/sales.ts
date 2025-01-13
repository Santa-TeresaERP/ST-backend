import { Router } from 'express'
import authorization from '@middlewares/authorization'
import salesController from '@controllers/salesController'

const router: Router = Router()

router.post('/', authorization, salesController.createSale)

router.get('/', authorization, salesController.getSales)

router.delete('/:id', authorization, salesController.deleteSale)

router.patch('/:id', authorization, salesController.updateSale)

export default router
