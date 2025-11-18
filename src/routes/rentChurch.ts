import express from 'express'
import authorization from '@middlewares/authorization'
import roleAuthorization from '@middlewares/roleAuthorization'
import rentChurchController from '@controllers/RentChurch'

const router = express.Router()

// Crear una reserva en iglesia
router.post(
  '/',
  authorization,
  roleAuthorization('canWrite', 'Iglesia'),
  rentChurchController.createRentChurchController,
)

// Obtener todas las reservas
router.get(
  '/',
  authorization,

  rentChurchController.getRentChurchesController,
)

// Obtener una reserva por ID
router.get(
  '/:id',
  authorization,
  roleAuthorization('canRead', 'Iglesia'),
  rentChurchController.getRentChurchController,
)

// Actualizar una reserva por ID
router.patch(
  '/:id',
  authorization,
  roleAuthorization('canEdit', 'Iglesia'),
  rentChurchController.updateRentChurchController,
)

// Desactivar (soft delete) una reserva por ID
router.put(
  '/:id',
  authorization,
  roleAuthorization('canDelete', 'Iglesia'),
  rentChurchController.deleteRentChurchController,
)

export default router
