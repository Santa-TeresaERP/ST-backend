import express from 'express'
import authorization from '@middlewares/authorization'
import roleAuthorization from '@middlewares/roleAuthorization'
import warehouseProductController from '@controllers/warehouse_Product'

const router = express.Router()

// Crear registro
router.post(
  '/',
  authorization,
  roleAuthorization('canWrite', 'inventario'),
  warehouseProductController.createWarehouseProduct,
)

// Obtener todos
router.get(
  '/',
  authorization,
  roleAuthorization('canRead', 'inventario'),
  warehouseProductController.getAllWarehouseProducts,
)

// Obtener por ID
router.get(
  '/:id',
  authorization,
  roleAuthorization('canRead', 'inventario'),
  warehouseProductController.getWarehouseProductById,
)

// Actualizar
router.patch(
  '/:id',
  authorization,
  roleAuthorization('canEdit', 'inventario'),
  warehouseProductController.updateWarehouseProduct,
)
router.put(
  '/:id',
  authorization,
  roleAuthorization('canDelete', 'inventario'),
  warehouseProductController.deleteWarehouseProduct,
)

// Obtener productos por almacén
router.get(
  '/warehouse/:warehouseId',
  authorization,
  roleAuthorization('canRead', 'inventario'),
  warehouseProductController.getWarehouseProductsByWarehouse,
)

// Obtener productos por producto
router.get(
  '/product/:productId',
  authorization,
  roleAuthorization('canRead', 'inventario'),
  warehouseProductController.getWarehouseProductsByProduct,
)

export default router
