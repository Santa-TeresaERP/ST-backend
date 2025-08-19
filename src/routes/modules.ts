import express from 'express'
import authorization from '@middlewares/authorization'
import roleAuthorization from '@middlewares/roleAuthorization'
import { getModuleById } from '@controllers/modules/getModuleById'
import { getModules } from '@controllers/modules/getModules'
import { updateModule } from '@controllers/modules/updateModule'

const router = express.Router()

// Obtener todos los módulos
router.get(
  '/',
  authorization,
  roleAuthorization('canRead', 'modulos'),
  getModules,
)

// Obtener un módulo por su ID
router.get(
  '/:id',
  authorization,
  roleAuthorization('canRead', 'modulos'),
  getModuleById,
)

// Actualizar un módulo
router.patch(
  '/:id',
  authorization,
  roleAuthorization('canEdit', 'modulos'),
  updateModule,
)

export default router
