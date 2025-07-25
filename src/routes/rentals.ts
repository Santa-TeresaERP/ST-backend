import express from 'express'
import authorization from '@middlewares/authorization'
import rentalsController from '@controllers/Rentals'

const router = express.Router()

// Crear un alquiler
router.post('/', authorization, rentalsController.createRentalController)

// Obtener todos los alquileres
router.get('/', authorization, rentalsController.getRentalsController)

// Obtener un alquiler específico por ID
router.get('/:id', authorization, rentalsController.getRentalController)

// Actualizar un alquiler específico por ID
router.patch('/:id', authorization, rentalsController.updateRentalController)

// Eliminar un alquiler específico por ID
router.delete('/:id', authorization, rentalsController.deleteRentalController)

export default router
