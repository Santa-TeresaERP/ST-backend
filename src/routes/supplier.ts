import { Router } from 'express'
import authorization from '@middlewares/authorization'
import roleAuthorization from '@middlewares/roleAuthorization'
import supplierController from '@controllers/supplier'

const router = Router()

// Crear un nuevo proveedor
router.post(
  '/',
  authorization,
  roleAuthorization('canWrite', 'inventario'),
  supplierController.createSupplier,
)

// Obtener todos los proveedores
router.get(
  '/',
  authorization,
  roleAuthorization('canRead', 'inventario'),
  supplierController.getSuppliers,
)

// Obtener un proveedor por ID
router.get(
  '/:id',
  authorization,
  roleAuthorization('canRead', 'inventario'),
  supplierController.getSupplier,
)

// Actualizar un proveedor
router.put(
  '/:id',
  authorization,
  roleAuthorization('canEdit', 'inventario'),
  supplierController.updateSupplier,
)

// Eliminar un proveedor (lógico)
router.patch(
  '/:id',
  authorization,
  roleAuthorization('canDelete', 'inventario'),
  supplierController.deleteSupplier,
)

export default router
