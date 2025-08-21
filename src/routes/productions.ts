import express from 'express'
import authorization from '@middlewares/authorization'
import roleAuthorization from '@middlewares/roleAuthorization'
import productionController from '@controllers/production'

const router = express.Router()

router.post(
  '/',
  authorization,
  roleAuthorization('canWrite', 'Produccion'),
  productionController.createProduction,
)
router.get(
  '/',
  authorization,
  roleAuthorization('canRead', 'Produccion'),
  productionController.getProductions,
)
router.get(
  '/:id',
  authorization,
  roleAuthorization('canRead', 'Produccion'),
  productionController.getProduction,
)
router.patch(
  '/:id',
  authorization,
  roleAuthorization('canEdit', 'Produccion'),
  productionController.updateProduction,
)
router.patch(
  '/:id/status',
  authorization,
  roleAuthorization('canEdit', 'Produccion'),
  productionController.toggleProductionStatus,
)

export default router
