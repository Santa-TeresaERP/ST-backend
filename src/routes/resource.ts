import express from 'express'
import authorization from '@middlewares/authorization'
import resourceController from '@controllers/Resource'

const router = express.Router()

// Crear un recurso
router.post('/', authorization, resourceController.CreateResource)

// Obtener todos los recursos
router.get('/', authorization, resourceController.GetResource)

// Actualizar un recurso por ID
router.patch('/:id', authorization, resourceController.UpdateResource)

// Eliminar un recurso por ID
router.delete('/:id', authorization, resourceController.DeleteResource)

export default router
