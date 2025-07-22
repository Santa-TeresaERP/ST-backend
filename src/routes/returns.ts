import express from 'express'
import authorization from '@middlewares/authorization'
import cashSessionCheck from '@middlewares/cashSessionCheck'
import ReturnsController from '@controllers/returns'

const router = express.Router()

// Crear una devolución - requiere sesión de caja activa
router.post(
  '/',
  authorization,
  cashSessionCheck,
  ReturnsController.CreateReturn,
)

// Obtener todas las devoluciones - opcionalmente filtradas por tienda si hay sesión activa
router.get('/', authorization, ReturnsController.GetReturns)
router.get('/:id', authorization, ReturnsController.GetReturn)
router.patch(
  '/:id',
  authorization,
  cashSessionCheck,
  ReturnsController.UpdateReturn,
)
router.delete('/:id', authorization, ReturnsController.DeleteReturn)

export default router
