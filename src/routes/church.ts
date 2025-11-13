import express from 'express'
import authorization from '@middlewares/authorization'
import roleAuthorization from '@middlewares/roleAuthorization'
import churchController from '@controllers/church/index'

const router = express.Router()

router.post(
  '/',
  authorization,
  roleAuthorization('canWrite', 'Iglesia'),
  churchController.createChurch,
)

router.get(
  '/',
  authorization,
  roleAuthorization('canRead', 'Iglesia'),
  churchController.getChurches,
)

router.get(
  '/all',
  authorization,
  roleAuthorization('canRead', 'Iglesia'),
  churchController.getChurchAll,
)

router.get(
  '/:id',
  authorization,
  roleAuthorization('canRead', 'Iglesia'),
  churchController.getChurch,
)

router.put(
  '/:id',
  authorization,
  roleAuthorization('canDelete', 'Iglesia'),
  churchController.deleteChurch,
)

router.patch(
  '/:id',
  authorization,
  roleAuthorization('canEdit', 'Iglesia'),
  churchController.updateChurch,
)

export default router
