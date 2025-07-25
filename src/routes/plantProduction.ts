import { Router } from 'express'
import authorization from '@middlewares/authorization'
import roleAuthorization from '@middlewares/roleAuthorization'
import PlantController from '@controllers/PlantProduction'

const router = Router()

// Crear una nueva planta
router.post(
  '/',
  authorization,
  roleAuthorization('canWrite', 'Produccion'),
  PlantController.createPlant,
)

// Obtener todas las plantas
router.get(
  '/',
  authorization,
  roleAuthorization('canRead', 'Produccion'),
  PlantController.getPlants,
)

// Obtener una planta por ID
router.get(
  '/:id',
  authorization,
  roleAuthorization('canRead', 'Produccion'),
  PlantController.getPlant,
)

// Actualizar una planta
router.patch(
  '/:id',
  authorization,
  roleAuthorization('canEdit', 'Produccion'),
  PlantController.updatePlant,
)

// Eliminar una planta
router.put(
  '/:id',
  authorization,
  roleAuthorization('canDelete', 'Produccion'),
  PlantController.deletePlant,
)

export default router
