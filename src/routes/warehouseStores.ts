import express from 'express'
import authorization from '@middlewares/authorization'
import roleAuthorization from '@middlewares/roleAuthorization'
import WarehouseStoreController from '@controllers/warehouseStore/index'

const router = express.Router()

// Ruta para crear un registro en el almacén
router.post(
  '/',
  authorization,
  roleAuthorization('canWrite', 'Ventas'),
  WarehouseStoreController.createWarehouseStoreController,
)

// Ruta para obtener todos los registros del almacén
router.get(
  '/',
  authorization,
  roleAuthorization('canRead', 'Ventas'),
  WarehouseStoreController.getWarehouseStoresController,
)

// Ruta para obtener un registro específico del almacén por ID
router.get(
  '/:id',
  authorization,
  roleAuthorization('canRead', 'Ventas'),
  WarehouseStoreController.getWarehouseStoreController,
)

// Ruta para actualizar un registro específico del almacén por ID
router.put(
  '/:id',
  authorization,
  roleAuthorization('canEdit', 'Ventas'),
  WarehouseStoreController.updateWarehouseStoreController,
)

// Ruta para eliminar un registro específico del almacén por ID
router.delete(
  '/:id',
  authorization,
  roleAuthorization('canDelete', 'Ventas'),
  WarehouseStoreController.deleteWarehouseStoreController,
)

export default router
