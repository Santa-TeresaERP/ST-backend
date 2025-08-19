import express from 'express'
import authorization from '@middlewares/authorization'
import roleAuthorization from '@middlewares/roleAuthorization'
import resourceController from '@controllers/Resource'

const router = express.Router()

// Crear recurso
router.post(
  '/',
  authorization,
  roleAuthorization('canWrite', 'inventario'),
  resourceController.CreateResource,
)

// Obtener todos los recursos
router.get(
  '/',
  authorization,
  roleAuthorization('canRead', 'inventario'),
  resourceController.GetResources,
)

// Obtener recurso por ID
router.get(
  '/:id',
  authorization,
  roleAuthorization('canRead', 'inventario'),
  resourceController.GetResource,
)

// Actualizar recurso
router.patch(
  '/:id',
  authorization,
  roleAuthorization('canEdit', 'inventario'),
  resourceController.UpdateResource,
)

// Eliminar recurso
router.delete(
  '/:id',
  authorization,
  roleAuthorization('canDelete', 'inventario'),
  resourceController.DeleteResource,
)

export default router
