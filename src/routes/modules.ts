import express from 'express'
import authorization from '@middlewares/authorization'
import { getModuleById } from '@controllers/modules/getModuleById'
import { getModules } from '@controllers/modules/getModules'
import { updateModule } from '@controllers/modules/updateModule'
import roleAuthorization from '@middlewares/roleAuthorization'

const router = express.Router()

router.get('/', authorization, getModules) // Ruta para obtener todos los módulos

router.get('/:id', authorization, getModuleById) // Ruta para obtener un módulo por su ID

router.patch(
  '/:id',
  authorization,
  roleAuthorization('canEdit', 'modulos'),
  updateModule,
) // Ruta para actualizar un módulo

export default router
