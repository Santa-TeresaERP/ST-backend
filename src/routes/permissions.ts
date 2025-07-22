import express from 'express'
import authorization from '@middlewares/authorization'
import permissionControllers from '@controllers/permission/index'

const router = express.Router()

// Crear un permiso individual
router.post(
  '/individual',
  authorization,
  permissionControllers.createPermissionController,
)

// Crear múltiples permisos para un rol
router.post(
  '/',
  authorization,
  permissionControllers.createMultiplePermissionsController,
)

// Obtener todos los permisos
router.get('/', authorization, permissionControllers.getPermissionsController)

// Actualizar un permiso
router.patch(
  '/:id',
  authorization,
  permissionControllers.updatePermissionController,
)

// Eliminar un permiso
router.delete(
  '/:id',
  authorization,
  permissionControllers.deletePermissionController,
)

export default router
