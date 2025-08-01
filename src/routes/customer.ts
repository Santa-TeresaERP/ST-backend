import { Router } from 'express'
import authorization from '@middlewares/authorization'
import customersController from '@controllers/customers/index'

const router = Router()

// Crear un nuevo cliente
router.post('/', authorization, customersController.create)

// Obtener todos los clientes
router.get('/', authorization, customersController.getAll)

// Obtener un cliente por ID
router.get('/:id', authorization, customersController.getById)

// Actualizar un cliente
router.put('/:id', authorization, customersController.update)

// Eliminar un cliente
router.delete('/:id', authorization, customersController.delete)

export default router
