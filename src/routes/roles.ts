import express from 'express'
import authorization from '@middlewares/authorization'
// import authorizePermissions from '@middlewares/roleAuthorization'
import rolesController from '@controllers/roles'

const router = express.Router()

// Crear un rol - requiere permiso de escritura en módulo 'roles'
router.post(
  '/',
  authorization,
  // authorizePermissions('canWrite', 'roles'),
  rolesController.createRole,
)

// Obtener todos los roles - requiere permiso de lectura en módulo 'roles'
router.get(
  '/',
  authorization,
  // authorizePermissions('canRead', 'roles'),
  rolesController.getRoles,
)

// Obtener un rol - requiere permiso de lectura en módulo 'roles'
router.get(
  '/:id',
  authorization,
  // authorizePermissions('canRead', 'roles'),
  rolesController.getRole,
)

// Actualizar un rol - requiere permiso de edición en módulo 'roles'
router.patch(
  '/:id',
  authorization,
  // authorizePermissions('canEdit', 'roles'),
  rolesController.updateRole,
)

// Eliminar un rol - requiere permiso de eliminación en módulo 'roles'
router.delete(
  '/:id',
  authorization,
  // authorizePermissions('canDelete', 'roles'),
  rolesController.deleteRole,
)

export default router
