import express from 'express'
import authorization from '@middlewares/authorization'
import {
  createRoleController,
  getRolesController,
  getRoleController,
  updateRoleController,
  deleteRoleController,
} from '@controllers/rolesController'

const router = express.Router()

// Crear un rol
router.post('/', authorization, createRoleController)

// Obtener todos los roles
router.get('/', authorization, getRolesController)

// Obtener un rol
router.get('/:id', authorization, getRoleController)

// Actualizar un rol
router.patch('/:id', authorization, updateRoleController)

// Eliminar un rol
router.delete('/:id', authorization, deleteRoleController)

export default router
