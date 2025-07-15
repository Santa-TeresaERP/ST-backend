import express from 'express'
import authorization from '@middlewares/authorization'
import warehouseStoreController from '@controllers/warehouseStore/index'

const router = express.Router()

// Ruta para crear un registro en el almacén
router.post('/', authorization, warehouseStoreController.createWarehouseStore)

// Ruta para obtener todos los registros del almacén
router.get('/', authorization, warehouseStoreController.getWarehouseStores)

// Ruta para obtener un registro específico del almacén por ID
router.get('/:id', authorization, warehouseStoreController.getWarehouseStore)

// Ruta para actualizar un registro específico del almacén por ID
router.put('/:id', authorization, warehouseStoreController.updateWarehouseStore)

// Ruta para eliminar un registro específico del almacén por ID
router.delete(
  '/:id',
  authorization,
  warehouseStoreController.deleteWarehouseStore,
)

export default router
