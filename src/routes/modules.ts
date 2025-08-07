import express from 'express'
import authorization from '@middlewares/authorization'
import { getModuleById } from '@controllers/modules/getModuleById'
import { getModules } from '@controllers/modules/getModules'
import { updateModule } from '@controllers/modules/updateModule'
import authorizePermissions from '@middlewares/roleAuthorization'

const router = express.Router()

// Obtener todos los módulos - requiere permiso de lectura en módulo 'modules'
router.get(
  '/',
  authorization,
  authorizePermissions('canRead', 'modulos'),
  getModules,
)

// Obtener un módulo por su ID - requiere permiso de lectura en módulo 'modules'
router.get(
  '/:id',
  authorization,
  authorizePermissions('canRead', 'modulos'),
  getModuleById,
)

// Actualizar un módulo - requiere permiso de edición en módulo 'modules'
router.patch(
  '/:id',
  authorization,
  authorizePermissions('canEdit', 'modulos'),
  updateModule,
)

export default router
