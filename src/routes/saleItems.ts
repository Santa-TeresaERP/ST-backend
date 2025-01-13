import { Router } from 'express'
import authorization from '@middlewares/authorization'
import salesItemsController from '@controllers/salesItemsController'

const router: Router = Router()

router.post('/', authorization, salesItemsController.createSaleItem)
router.get('/', authorization, salesItemsController.getSalesItems)
router.get('/sale/:saleId', authorization, salesItemsController.getSaleItemsBySale)
router.delete('/:id', authorization, salesItemsController.deleteSaleItem)
router.patch('/:id', authorization, salesItemsController.updateSaleItem)

export default router
