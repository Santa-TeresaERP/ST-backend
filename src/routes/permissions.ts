import express from 'express'
import authorization from '@middlewares/authorization'
import {
  createPermissionController,
  createMultiplePermissionsController,
  getPermissionsController,
  updatePermissionController,
  deletePermissionController,
} from '@controllers/permissionsController'

const router = express.Router()

// Crear un permiso individual
router.post('/individual', authorization, createPermissionController)

// Crear múltiples permisos para un rol
router.post('/', authorization, createMultiplePermissionsController)

// Obtener todos los permisos
router.get('/', authorization, getPermissionsController)

// Actualizar un permiso
router.patch('/:id', authorization, updatePermissionController)

// Eliminar un permiso
router.delete('/:id', authorization, deletePermissionController)

export default router
