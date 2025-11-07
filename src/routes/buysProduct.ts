import { Router } from 'express'
import authorization from '@middlewares/authorization'
import roleAuthorization from '@middlewares/roleAuthorization'
import buysProductController from '@controllers/BuysProduct'

const router = Router()

// Get: Obtener compras de productos con status true
router.get(
  '/',
  authorization,
  roleAuthorization('canRead', 'inventario'),
  buysProductController.GetBuysProducts,
)

// GetAll: Obtener todas las compras de productos sin filtro (para desarrollador)
router.get(
  '/all',
  authorization,
  roleAuthorization('canRead', 'inventario'),
  buysProductController.GetAllBuysProducts,
)

// GetById: Obtener compra de producto por ID
router.get(
  '/:id',
  authorization,
  roleAuthorization('canRead', 'inventario'),
  buysProductController.GetBuysProductById,
)

// Crear compra de producto
router.post(
  '/',
  authorization,
  roleAuthorization('canWrite', 'inventario'),
  buysProductController.CreateBuysProduct,
)

// Actualizar compra de producto
router.patch(
  '/:id',
  authorization,
  roleAuthorization('canEdit', 'inventario'),
  buysProductController.UpdateBuysProduct,
)

// Delete: Cambiar status a false
router.put(
  '/:id',
  authorization,
  roleAuthorization('canDelete', 'inventario'),
  buysProductController.DeleteBuysProduct,
)

export default router
