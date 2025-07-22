import express from 'express'
import authorization from '@middlewares/authorization'
import cashSessionCheck from '@middlewares/cashSessionCheck'
import salesController from '@controllers/Sales'

const router = express.Router()

// Crear una venta - requiere sesión de caja activa
router.post(
  '/',
  authorization,
  cashSessionCheck,
  salesController.createSaleController,
)

// Obtener todas las ventas
router.get('/', authorization, salesController.getSalesController)

// Obtener una venta específica por ID
router.get('/:id', authorization, salesController.getSaleController)

// Actualizar una venta específica por ID
router.patch(
  '/:id',
  authorization,
  cashSessionCheck,
  salesController.updateSaleController,
)

// Eliminar una venta específica por ID
router.delete('/:id', authorization, salesController.deleteSaleController)

export default router
