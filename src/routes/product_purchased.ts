import express from 'express'
// Importamos el objeto agrupador de controladores para una mayor limpieza
import productPurchasedController from '@controllers/productPurchased'
import authorization from '@middlewares/authorization'

const router = express.Router()

// ===================================================================
// DEFINICIÓN DE LAS RUTAS PARA LA ENTIDAD PRODUCT_PURCHASED
// ===================================================================

// POST /productPurchased -> Llama al controlador de creación
router.post('/', authorization, productPurchasedController.create)

// GET /productPurchased -> Llama al controlador 'get' (solo activos, para la UI)
router.get('/', authorization, productPurchasedController.get)

// GET /productPurchased/all -> Llama al controlador 'getAll' (todos, para desarrollador)
router.get('/all', authorization, productPurchasedController.getAll)

// GET /productPurchased/:id -> Llama al controlador de búsqueda por ID
router.get('/:id', authorization, productPurchasedController.getById)

// PATCH /productPurchased/:id -> Llama al controlador de actualización
router.patch('/:id', authorization, productPurchasedController.update)

// DELETE /productPurchased/:id -> Llama al controlador de eliminación (soft delete)
router.delete('/:id', authorization, productPurchasedController.delete)

export default router
