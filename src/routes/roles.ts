import express from 'express'
import authorization from '@middlewares/authorization'
import {
  createRoleController,
  getRolesController,
  updateRoleController,
  deleteRoleController,
} from '@controllers/rolesController'

const router = express.Router()

// Crear un rol
router.post('/', authorization, createRoleController)

// Obtener todos los roles
router.get('/', authorization, getRolesController)

// Actualizar un rol
router.patch('/:id', authorization, updateRoleController)

// Eliminar un rol
router.delete('/:id', authorization, deleteRoleController)

export default router
