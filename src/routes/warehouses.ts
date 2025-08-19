import express from 'express'
import authorization from '@middlewares/authorization'
import roleAuthorization from '@middlewares/roleAuthorization'
import warehouseController from '@controllers/warehouse'

const router = express.Router()

// Crear almacén
router.post(
  '/',
  authorization,
  roleAuthorization('canWrite', 'inventario'),
  warehouseController.CreateWarehouse,
)

// Obtener todos los almacenes
router.get(
  '/',
  authorization,
  roleAuthorization('canRead', 'inventario'),
  warehouseController.GetWarehouses,
)

// Actualizar almacén
router.put(
  '/:id',
  authorization,
  roleAuthorization('canEdit', 'inventario'),
  warehouseController.UpdateWarehouse,
)

// Eliminar almacén
router.patch(
  '/:id',
  authorization,
  roleAuthorization('canDelete', 'inventario'),
  warehouseController.DeleteWarehouse,
)

export default router
