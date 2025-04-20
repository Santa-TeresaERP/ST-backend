import express from 'express'
import authorization from '@middlewares/authorization'
import rolesController from '@controllers/roles'

const router = express.Router()

// Crear un rol||
router.post('/', authorization, rolesController.createRole)

// Obtener todos los roles
router.get('/', authorization, rolesController.getRoles)

// Obtener un rol
router.get('/:id', authorization, rolesController.getRole)
router.patch('/:id', authorization, rolesController.updateRole)
router.delete('/:id', authorization, rolesController.deleteRole)

export default router
