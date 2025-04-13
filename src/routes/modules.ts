import express from 'express'
import authorization from '@middlewares/authorization'
import { getModuleById } from '@controllers/Modules/getModuleById'
import { getModules } from '@controllers/Modules/getModules'
import { updateModule } from '@controllers/Modules/updateModule'

const router = express.Router()

router.get('/', authorization, getModules) // Ruta para obtener todos los módulos

router.get('/:id', authorization, getModuleById) // Ruta para obtener un módulo por su ID

router.patch('/:id', authorization, updateModule) // Ruta para actualizar un módulo

export default router
