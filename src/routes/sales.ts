import express from 'express'
import authorization from '@middlewares/authorization'
import cashSessionCheck from '@middlewares/cashSessionCheck'
import salesController from '@controllers/Sales'
import generateSalesReportController from '@controllers/Sales/generateSalesReport'
import roleAuthorization from '@middlewares/roleAuthorization'

const router = express.Router()

// Crear una venta - requiere sesión de caja activa
router.post(
  '/',
  authorization,
  cashSessionCheck,
  roleAuthorization('canWrite', 'Ventas'),
  salesController.createSaleController,
)

// Obtener todas las ventas
router.get('/', authorization, salesController.getSalesController)

// Generar reporte de ventas (JSON con texto)
router.get(
  '/report',
  authorization,
  roleAuthorization('canRead', 'Ventas'),
  async (req, res, next) => {
    try {
      await generateSalesReportController(req, res)
    } catch (err) {
      next(err)
    }
  },
)

// Obtener una venta específica por ID
router.get(
  '/:id',
  authorization,
  roleAuthorization('canRead', 'Ventas'),
  salesController.getSaleController,
)

// Actualizar una venta específica por ID
router.patch(
  '/:id',
  authorization,
  cashSessionCheck,
  roleAuthorization('canEdit', 'Ventas'),
  salesController.updateSaleController,
)

// Eliminar una venta específica por ID
router.delete(
  '/:id',
  authorization,
  roleAuthorization('canDelete', 'Ventas'),
  salesController.deleteSaleController,
)

export default router
