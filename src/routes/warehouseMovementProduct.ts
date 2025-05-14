import express from 'express'
import authorization from '@middlewares/authorization'
import index from '@controllers/warehouse_movement_product'

const router = express.Router()

// Crear un movimiento de producto
router.post('/', authorization, index.CreateWarehouseMovementProduct)

// Obtener todos los movimientos de productos
router.get('/', authorization, index.GetWarehouseMovementProducts)

// Actualizar un movimiento de producto por ID
router.patch('/:id', authorization, index.UpdateWarehouseMovementProduct)

// Eliminar un movimiento de producto por ID
router.delete('/:id', authorization, index.DeleteWarehouseMovementProduct)

export default router
