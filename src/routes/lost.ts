import express from 'express'
import authorization from '@middlewares/authorization'
import roleAuthorization from '@middlewares/roleAuthorization'
import lostController from '@controllers/Lost'

const router = express.Router()

// Crear una pérdida
router.post(
  '/',
  authorization,
  roleAuthorization('canWrite', 'Produccion'),
  lostController.createLost,
)

// Obtener todas las pérdidas
router.get(
  '/',
  authorization,
  roleAuthorization('canRead', 'Produccion'),
  lostController.getAllLost,
)

// Obtener una pérdida por ID
router.get(
  '/:id',
  authorization,
  roleAuthorization('canRead', 'Produccion'),
  lostController.getLostById,
)

// Actualizar una pérdida
router.patch(
  '/:id',
  authorization,
  roleAuthorization('canEdit', 'Produccion'),
  lostController.updateLost,
)

// Eliminar una pérdida
router.delete(
  '/:id',
  authorization,
  roleAuthorization('canDelete', 'Produccion'),
  lostController.deleteLost,
)

export default router
