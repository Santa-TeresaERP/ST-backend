import express from 'express'
import authorization from '@middlewares/authorization'
import rolesController from '@controllers/rolesController'
import authorizePermissions from '@middlewares/roleAuthorization'

const router = express.Router()

// Crear un rol||
router.post(
  '/',
  authorization,
  authorizePermissions('canWrite', 'usuariosyroles'),
  rolesController.createRoleController,
)

// Obtener todos los roles
router.get('/', authorization, rolesController.getRolesController)

// Obtener un rol
router.get('/:id', authorization, rolesController.getRoleController)

// Actualizar un rol
router.patch('/:id', authorization, rolesController.updateRoleController)

// Eliminar un rol
router.delete('/:id', authorization, rolesController.deleteRoleController)

export default router
