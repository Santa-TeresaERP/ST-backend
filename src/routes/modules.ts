import express from 'express'
import authorization from '@middlewares/authorization'
import modulesController from '@controllers/modulesController'

const router = express.Router()

router.get('/', authorization, modulesController.getModules) // Ruta para obtener todos los módulos
router.patch('/:id', authorization, modulesController.updateModule) // Ruta para actualizar un módulo

export default router
