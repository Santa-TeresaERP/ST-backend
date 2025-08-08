import express from 'express'
import authorization from '@middlewares/authorization'
// import authorizePermissions from '@middlewares/roleAuthorization'
import permissionController from '@controllers/permission/index'
import roleAuthorization from '@middlewares/roleAuthorization'

const router = express.Router()

// Crear un permiso individual - requiere permiso de escritura en módulo 'permissions'
router.post(
  '/individual',
  authorization,
  roleAuthorization('canWrite', 'roles'),
  permissionController.createPermissionController,
)

// Crear múltiples permisos para un rol - requiere permiso de escritura en módulo 'permissions'
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

// Eliminar un permiso - requiere permiso de eliminación en módulo 'permissions'
router.delete(
  '/:id',
  authorization,
  roleAuthorization('canDelete', 'roles'),
  permissionController.deletePermissionController,
)

export default router
