import express from 'express'
import SalesChannelController from '@controllers/sales_channel'
import authorization from '@middlewares/authorization'

const router = express.Router()

router.post('/', authorization, SalesChannelController.CreateSalesChannel)
router.get('/', authorization, SalesChannelController.GetSalesChannels)
router.get('/:id', authorization, SalesChannelController.GetSalesChannel)
router.patch('/:id', authorization, SalesChannelController.UpdateSalesChannel)
router.delete('/:id', authorization, SalesChannelController.DeleteSalesChannel)

export default router 