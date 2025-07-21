import express from 'express'
import authorization from '@middlewares/authorization'
import EntranceController from '@controllers/entrance'

const router = express.Router()

// Crear una nueva entrada
router.post('/', authorization, EntranceController.createEntranceController)

// Obtener todas las entradas
router.get('/', authorization, EntranceController.getEntrancesController)

// Obtener una entrada por ID
router.get('/:id', authorization, EntranceController.getEntranceController)

// Actualizar una entrada por ID
router.patch('/:id', authorization, EntranceController.updateEntranceController)

// Eliminar una entrada por ID
router.delete(
  '/:id',
  authorization,
  EntranceController.deleteEntranceController,
)

export default router
