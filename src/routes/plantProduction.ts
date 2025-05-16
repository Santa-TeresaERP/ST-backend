import { Router } from 'express'
import PlantController from '@controllers/PlantProduction'

const router = Router()

// Crear una nueva planta
router.post('/', PlantController.createPlant)

// Obtener todas las plantas
router.get('/', PlantController.getPlants)

// Obtener una planta por ID
router.get('/:id', PlantController.getPlant)

// Actualizar una planta
router.patch('/:id', PlantController.updatePlant)

// Eliminar una planta
router.delete('/:id', PlantController.deletePlant)

export default router
