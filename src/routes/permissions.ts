import express from 'express'
import authorization from '@middlewares/authorization'
import permissionController from '@controllers/permission/index'
import roleAuthorization from '@middlewares/roleAuthorization'

const router = express.Router()

// Crear un permiso individual
router.post(
  '/individual',
  authorization,
  roleAuthorization('canWrite', 'roles'),
  permissionController.createPermissionController,
)

// Crear múltiples permisos para un rol
router.post(
  '/',
  authorization,
  roleAuthorization('canWrite', 'roles'),
  permissionController.createMultiplePermissionsController,
)

// Obtener todos los permisos
router.get(
  '/',
  authorization,
  roleAuthorization('canRead', 'roles'),
  permissionController.getPermissionsController,
)

// Actualizar un permiso
router.patch(
  '/:id',
  authorization,
  roleAuthorization('canEdit', 'roles'),
  permissionController.updatePermissionController,
)

// Eliminar un permiso
router.delete(
  '/:id',
  authorization,
  roleAuthorization('canDelete', 'roles'),
  permissionController.deletePermissionController,
)

export default router
