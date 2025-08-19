import express from 'express'
import authorization from '@middlewares/authorization'
import roleAuthorization from '@middlewares/roleAuthorization'
import cashSessionCheck from '@middlewares/cashSessionCheck'
import ReturnsController from '@controllers/returns'

const router = express.Router()

// Crear una devolución - requiere sesión de caja activa
router.post(
  '/',
  authorization,
  roleAuthorization('canWrite', 'Ventas'),
  cashSessionCheck,
  ReturnsController.CreateReturn,
)

// Obtener todas las devoluciones - opcionalmente filtradas por tienda si hay sesión activa
router.get(
  '/',
  authorization,
  roleAuthorization('canRead', 'Ventas'),
  ReturnsController.GetReturns,
)
router.get(
  '/:id',
  authorization,
  roleAuthorization('canRead', 'Ventas'),
  ReturnsController.GetReturn,
)
router.patch(
  '/:id',
  authorization,
  roleAuthorization('canEdit', 'Ventas'),
  cashSessionCheck,
  ReturnsController.UpdateReturn,
)
router.delete(
  '/:id',
  authorization,
  roleAuthorization('canDelete', 'Ventas'),
  ReturnsController.DeleteReturn,
)

export default router
