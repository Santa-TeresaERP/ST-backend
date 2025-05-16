import express from 'express'
import authorization from '@middlewares/authorization'
import warehouseProductController from '@controllers/warehouse_Product'

const router = express.Router()

// CRUD básico
router.post(
  '/',
  authorization,
  warehouseProductController.createWarehouseProduct,
)
router.get(
  '/',
  authorization,
  warehouseProductController.getAllWarehouseProducts,
)
router.get(
  '/:id',
  authorization,
  warehouseProductController.getWarehouseProductById,
)
router.patch(
  '/:id',
  authorization,
  warehouseProductController.updateWarehouseProduct,
)
router.delete(
  '/:id',
  authorization,
  warehouseProductController.deleteWarehouseProduct,
)

// Rutas específicas
router.get(
  '/warehouse/:warehouseId',
  authorization,
  warehouseProductController.getWarehouseProductsByWarehouse,
)
router.get(
  '/product/:productId',
  authorization,
  warehouseProductController.getWarehouseProductsByProduct,
)

export default router
