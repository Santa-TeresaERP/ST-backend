import { Router } from 'express'
import authorization from '@middlewares/authorization'
import roleAuthorization from '@middlewares/roleAuthorization'
import buysResourceController from '@controllers/buysResource'

const router = Router()

// Obtener todos los recursos comprados
router.get(
  '/',
  authorization,
  roleAuthorization('canRead', 'inventario'),
  buysResourceController.GetBuysResources,
)

// Obtener recurso por ID
router.get(
  '/:id',
  authorization,
  roleAuthorization('canRead', 'inventario'),
  buysResourceController.GetBuysResourceById,
)

// Crear recurso comprado
router.post(
  '/',
  authorization,
  roleAuthorization('canWrite', 'inventario'),
  buysResourceController.CreateBuysResource,
)

// Actualizar recurso comprado
router.patch(
  '/:id',
  authorization,
  roleAuthorization('canEdit', 'inventario'),
  buysResourceController.UpdateBuysResource,
)

// Eliminar recurso comprado
router.delete(
  '/:id',
  authorization,
  roleAuthorization('canDelete', 'inventario'),
  buysResourceController.DeleteBuysResource,
)
router.get('/', buysResourceController.GetBuysResources)
router.post('/', buysResourceController.CreateBuysResource)
router.patch('/:id', buysResourceController.UpdateBuysResource)
router.put('/:id', buysResourceController.DeleteBuysResource)
router.get('/:id', buysResourceController.GetBuysResourceById) // Nueva ruta

export default router
