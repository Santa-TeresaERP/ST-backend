import express from 'express'
import authorization from '@middlewares/authorization'
import overheadController from '@controllers/overheads'

const router = express.Router()

router.post('/', authorization, overheadController.createOverheadsController)
router.post(
  '/monasterio',
  authorization,
  overheadController.createMonasterioOHController,
)
router.get('/', authorization, overheadController.getAllOverheadsController)
router.get('/:id', authorization, overheadController.getOverheadController)
router.patch('/:id', authorization, overheadController.updateOverheadController)
router.put('/:id', authorization, overheadController.deleteOverheadController)
router.get(
  '/monthly',
  authorization,
  overheadController.getMonthlyExpenseController,
)
router.get('/all', authorization, overheadController.getAllOverheadsController)

export default router
