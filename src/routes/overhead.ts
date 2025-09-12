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
router.get(
  '/monastery',
  authorization,
  overheadController.getMonasteryController,
)
router.get('/', authorization, overheadController.getOverheadsController)

export default router
