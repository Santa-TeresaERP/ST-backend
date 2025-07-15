import { Router } from 'express'
import authorization from '@middlewares/authorization'
import SaleDetailController from '@controllers/SaleDetail'

const router = Router()

router.post('/', authorization, SaleDetailController.createSaleDetail)
router.get('/', authorization, SaleDetailController.getSaleDetails)
router.get('/:id', authorization, SaleDetailController.getSaleDetail)
router.patch('/:id', authorization, SaleDetailController.updateSaleDetail)
router.delete('/:id', authorization, SaleDetailController.deleteSaleDetail)

export default router
