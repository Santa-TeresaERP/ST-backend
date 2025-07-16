import express from 'express'
import authorization from '@middlewares/authorization'
import warehouseStoreController from '@controllers/WarehouseStore/index'

const router = express.Router()

// Ruta para crear un registro en el almacén
router.post(
  '/',
  authorization,
  warehouseStoreController.createWarehouseStoreController,
)

// Ruta para obtener todos los registros del almacén
router.get(
  '/',
  authorization,
  warehouseStoreController.getWarehouseStoresController,
)

// Ruta para obtener un registro específico del almacén por ID
router.get(
  '/:id',
  authorization,
  warehouseStoreController.getWarehouseStoreController,
)

// Ruta para actualizar un registro específico del almacén por ID
router.put(
  '/:id',
  authorization,
  warehouseStoreController.updateWarehouseStoreController,
)

// Ruta para eliminar un registro específico del almacén por ID
router.delete(
  '/:id',
  authorization,
  warehouseStoreController.deleteWarehouseStoreController,
)

export default router
