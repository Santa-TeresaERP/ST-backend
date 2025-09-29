import { Router, type RequestHandler } from 'express'
import authorization from '@middlewares/authorization'
import roleAuthorization from '@middlewares/roleAuthorization'
import {
  createMonasteryExpense,
  deleteMonasteryExpense,
  getAllMonasteryExpenses,
  getMonasteryExpenseById,
  updateMonasteryExpense,
} from '@controllers/MonasteryExpense'

const router = Router()

// Crear un gasto del monasterio
router.post(
  '/',
  authorization,
  roleAuthorization('canWrite', 'Finanzas'),
  createMonasteryExpense as unknown as RequestHandler,
)

// Obtener todos los gastos del monasterio
router.get(
  '/',
  authorization,
  roleAuthorization('canRead', 'Finanzas'),
  getAllMonasteryExpenses as unknown as RequestHandler,
)

// Obtener un gasto del monasterio por ID
router.get(
  '/:id',
  authorization,
  roleAuthorization('canRead', 'Finanzas'),
  getMonasteryExpenseById as unknown as RequestHandler,
)

// Actualizar un gasto del monasterio
router.patch(
  '/:id',
  authorization,
  roleAuthorization('canEdit', 'Finanzas'),
  updateMonasteryExpense as unknown as RequestHandler,
)

// Eliminar un gasto del monasterio
router.delete(
  '/:id',
  authorization,
  roleAuthorization('canDelete', 'Finanzas'),
  deleteMonasteryExpense as unknown as RequestHandler,
)

export default router
