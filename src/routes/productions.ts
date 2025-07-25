import express from 'express'
import authorization from '@middlewares/authorization'
import roleAuthorization from '@middlewares/roleAuthorization'
import productionController from '@controllers/production'

const router = express.Router()

// Crear producción
router.post(
  '/',
  authorization,
  roleAuthorization('canWrite', 'Produccion'),
  productionController.createProduction,
)

// Obtener todas las producciones
router.get(
  '/',
  authorization,
  roleAuthorization('canRead', 'Produccion'),
  productionController.getProductions,
)

// Obtener una producción por ID
router.get(
  '/:id',
  authorization,
  roleAuthorization('canRead', 'Produccion'),
  productionController.getProduction,
)

// Actualizar producción
router.patch(
  '/:id',
  authorization,
  roleAuthorization('canEdit', 'Produccion'),
  productionController.updateProduction,
)

// Eliminar producción
router.delete(
  '/:id',
  authorization,
  roleAuthorization('canDelete', 'Produccion'),
  productionController.deleteProduction,
)

export default router
