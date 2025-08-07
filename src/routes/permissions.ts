import express from 'express'
import authorization from '@middlewares/authorization'
// import authorizePermissions from '@middlewares/roleAuthorization'
import permissionController from '@controllers/permission/index'

const router = express.Router()

// Crear un permiso individual - requiere permiso de escritura en módulo 'permissions'
router.post(
  '/individual',
  authorization,
  // authorizePermissions('canWrite', 'permissions'),
  permissionController.createPermissionController,
)

// Crear múltiples permisos para un rol - requiere permiso de escritura en módulo 'permissions'
router.post(
  '/',
  authorization,
  // authorizePermissions('canWrite', 'permissions'),
  permissionController.createMultiplePermissionsController,
)

// Obtener todos los permisos - requiere permiso de lectura en módulo 'permissions'
router.get(
  '/',
  authorization,
  // authorizePermissions('canRead', 'permissions'),
  permissionController.getPermissionsController,
)

// Actualizar permisos de un rol - requiere permiso de edición en módulo 'permissions'
router.patch(
  '/role/:roleId',
  authorization,
  // authorizePermissions('canEdit', 'permissions'),
  permissionController.updatePermissionController,
)

// Eliminar un permiso - requiere permiso de eliminación en módulo 'permissions'
router.delete(
  '/:id',
  authorization,
  // authorizePermissions('canDelete', 'permissions'),
  permissionController.deletePermissionController,
)

export default router
