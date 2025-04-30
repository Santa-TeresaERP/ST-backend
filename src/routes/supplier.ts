import { Router } from 'express'
import supplierController from '@controllers/supplier'

const router = Router()

// Crear un nuevo proveedor
router.post('/', supplierController.createSupplier)

// Obtener todos los proveedores
router.get('/', supplierController.getSuppliers)

// Obtener un proveedor por ID
router.get('/:id', supplierController.getSupplier)

// Actualizar un proveedor
router.put('/:id', supplierController.updateSupplier)

// Eliminar un proveedor
router.delete('/:id', supplierController.deleteSupplier)

export default router
