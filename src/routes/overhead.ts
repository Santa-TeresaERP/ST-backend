import express from 'express'
import authorization from '@middlewares/authorization'
import overheadController from '@controllers/overheads/index'

const router = express.Router()

router.post('/', authorization, overheadController.createOverheadsController)
router.post(
  '/monasterio',
  authorization,
  overheadController.createMonasterioOHController,
)
router.get('/all', authorization, overheadController.getAllOverheadsController)
router.get(
  '/monthly',
  authorization,
  overheadController.getMonthlyExpenseController,
)
router.get('/all', authorization, overheadController.getAllOverheadsController)

export default router
