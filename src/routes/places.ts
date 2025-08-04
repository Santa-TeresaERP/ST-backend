import express from 'express'
import authorization from '@middlewares/authorization'
import placesController from '@controllers/Places'

const router = express.Router()

// Crear un lugar
router.post('/', authorization, placesController.createPlaceController)

// Obtener todos los lugares
router.get('/', authorization, placesController.getPlacesController)

// Obtener un lugar específico por ID
router.get('/:id', authorization, placesController.getPlaceController)

// Actualizar un lugar específico por ID
router.patch('/:id', authorization, placesController.updatePlaceController)

// Eliminar un lugar específico por ID
router.delete('/:id', authorization, placesController.deletePlaceController)

export default router
