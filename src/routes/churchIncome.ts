import express from 'express'
import authorization from '@middlewares/authorization'
import roleAuthorization from '@middlewares/roleAuthorization'
import useIncomeChurchController from '@controllers/Incomechurch'

const router = express.Router()

router.post(
  '/',
  authorization,
  roleAuthorization('canWrite', 'Iglesia'),
  useIncomeChurchController.createIncomeChurch,
)
router.get(
  '/',
  authorization,
  roleAuthorization('canRead', 'Iglesia'),
  useIncomeChurchController.getAllIncomes,
)
router.get(
  '/active',
  authorization,
  roleAuthorization('canRead', 'Iglesia'),
  useIncomeChurchController.getActiveIncomes,
)
router.get(
  '/:id',
  authorization,
  roleAuthorization('canRead', 'Iglesia'),
  useIncomeChurchController.getIncomeChurchById,
)
router.put(
  '/:id',
  authorization,
  roleAuthorization('canEdit', 'Iglesia'),
  useIncomeChurchController.updateIncomeChurch,
)
router.delete(
  '/:id',
  authorization,
  useIncomeChurchController.deleteIncomeChurch,
)

export default router
