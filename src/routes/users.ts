import express from 'express'
import authorization from '@middlewares/authorization'
// import authorizePermissions from '@middlewares/roleAuthorization'
import userController from '@controllers/User/index'

const router = express.Router()

// Crear usuario - requiere permiso de escritura en módulo 'users'
router.post(
  '/',
  authorization,
  // authorizePermissions('canWrite', 'users'),
  userController.createUser,
)

// Obtener usuarios activos - requiere permiso de lectura en módulo 'users'
router.get(
  '/',
  authorization,
  // authorizePermissions('canRead', 'users'),
  userController.getUsers,
)

// Obtener todos los usuarios - requiere permiso de lectura en módulo 'users'
router.get(
  '/all',
  authorization,
  // authorizePermissions('canRead', 'users'),
  userController.getUsersAll,
)

// Obtener un usuario - requiere permiso de lectura en módulo 'users'
router.get(
  '/:id',
  authorization,
  // authorizePermissions('canRead', 'users'),
  userController.getUser,
)

// Eliminar usuario (soft delete) - requiere permiso de eliminación en módulo 'users'
router.put(
  '/:id',
  authorization,
  // authorizePermissions('canDelete', 'users'),
  userController.deleteUser,
)

// Actualizar usuario - requiere permiso de edición en módulo 'users'
router.patch(
  '/:id',
  authorization,
  // authorizePermissions('canEdit', 'users'),
  userController.updateUser,
)

// Cambiar contraseña - requiere permiso de edición en módulo 'users'
router.patch(
  '/changes/:id',
  authorization,
  // authorizePermissions('canEdit', 'users'),
  userController.changePassword,
)

export default router
