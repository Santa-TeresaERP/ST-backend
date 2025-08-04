import express from 'express'
import authorization from '@middlewares/authorization'
import permissionController from '@controllers/permission/index'

const router = express.Router()

// Crear un permiso individual
router.post(
  '/individual',
  authorization,
  permissionController.createPermissionController,
)

// Crear múltiples permisos para un rol
router.post(
  '/',
  authorization,
  permissionController.createMultiplePermissionsController,
)

// Obtener todos los permisos
router.get('/', authorization, permissionController.getPermissionsController)

router.patch(
  '/role/:roleId',
  authorization,
  permissionController.updatePermissionController,
)

// Eliminar un permiso
router.delete(
  '/:id',
  authorization,
  permissionController.deletePermissionController,
)

export default router
