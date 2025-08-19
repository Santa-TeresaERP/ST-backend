import express from 'express'
import authorization from '@middlewares/authorization'
import roleAuthorization from '@middlewares/roleAuthorization'
import cashSessionController from '@controllers/cash_session'

const router = express.Router()

// Crear una nueva sesión de caja
router.post(
  '/',
  authorization,
  roleAuthorization('canWrite', 'Ventas'),
  cashSessionController.createCashSession,
)

// Obtener todas las sesiones de caja
router.get(
  '/',
  authorization,
  roleAuthorization('canRead', 'Ventas'),
  cashSessionController.getCashSessions,
)

// Verificar si una tienda tiene una sesión de caja activa
router.get(
  '/store/:storeId/active',
  authorization,
  roleAuthorization('canRead', 'Ventas'),
  cashSessionController.checkStoreActiveSession,
)

// Obtener una sesión de caja por ID
router.get(
  '/:id',
  authorization,
  roleAuthorization('canRead', 'Ventas'),
  cashSessionController.getCashSessionById,
)

// Obtener detalles completos de una sesión de caja (incluye totales de ventas y devoluciones)
router.get(
  '/:id/details',
  authorization,
  roleAuthorization('canRead', 'Ventas'),
  cashSessionController.getCashSessionDetails,
)

// Actualizar una sesión de caja
router.patch(
  '/:id',
  authorization,
  roleAuthorization('canEdit', 'Ventas'),
  cashSessionController.updateCashSession,
)

// Eliminar todas las sesiones de caja de una tienda específica
router.delete(
  '/:storeId',
  authorization,
  roleAuthorization('canDelete', 'Ventas'),
  cashSessionController.deleteCashSession,
)

export default router
