import express from 'express'
import authorization from '@middlewares/authorization'
import cashSessionController from '@controllers/cash_session'

const router = express.Router()

// Crear una nueva sesión de caja
router.post('/', authorization, cashSessionController.createCashSession)

// Obtener todas las sesiones de caja
router.get('/', authorization, cashSessionController.getCashSessions)

// Obtener una sesión de caja por ID
router.get('/:id', authorization, cashSessionController.getCashSessionById)

// Actualizar una sesión de caja
router.patch('/:id', authorization, cashSessionController.updateCashSession)

// Eliminar una sesión de caja
router.delete('/:id', authorization, cashSessionController.deleteCashSession)

export default router
