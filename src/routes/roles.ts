import express from 'express'
import authorization from '@middlewares/authorization'
import roleAuthorization from '@middlewares/roleAuthorization'
import rolesController from '@controllers/roles'

const router = express.Router()

// Crear un rol
router.post(
  '/',
  authorization,
  roleAuthorization('canWrite', 'roles'),
  rolesController.createRole,
)

// Obtener todos los roles
router.get(
  '/',
  authorization,
  roleAuthorization('canRead', 'roles'),
  rolesController.getRoles,
)

// Obtener un rol
router.get(
  '/:id',
  authorization,
  roleAuthorization('canRead', 'roles'),
  rolesController.getRole,
)

// Actualizar rol
router.patch(
  '/:id',
  authorization,
  roleAuthorization('canEdit', 'roles'),
  rolesController.updateRole,
)

// Eliminar rol
router.delete(
  '/:id',
  authorization,
  roleAuthorization('canDelete', 'roles'),
  rolesController.deleteRole,
)

export default router
