import express from 'express'
import authorization from '@middlewares/authorization'
import rentChurchController from '@controllers/RentChurch'

const router = express.Router()

// Crear una reserva en iglesia
router.post('/', authorization, rentChurchController.createRentChurchController)

// Obtener todas las reservas
router.get('/', authorization, rentChurchController.getRentChurchesController)

// Obtener una reserva por ID
router.get('/:id', authorization, rentChurchController.getRentChurchController)

// Actualizar una reserva por ID
router.patch(
  '/:id',
  authorization,
  rentChurchController.updateRentChurchController,
)

// Desactivar (soft delete) una reserva por ID
router.put(
  '/:id',
  authorization,
  rentChurchController.deleteRentChurchController,
)

export default router
