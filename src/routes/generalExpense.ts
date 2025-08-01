  import express from 'express';
import authorization from '@middlewares/authorization';

// Se importa el controlador específico para GeneralExpense
import generalExpenseController from '@controllers/GeneralExpense';

const router = express.Router();

// La ruta base será /api/finanzas/expenses (definida en el index de rutas de finanzas)

// POST / -> Crear un nuevo gasto
router.post('/', authorization, generalExpenseController.create);

// GET / -> Obtener todos los gastos
router.get('/', authorization, generalExpenseController.getAll);

// GET /:id -> Obtener un gasto por ID
router.get('/:id', authorization, generalExpenseController.getById);

// PUT /:id -> Actualizar un gasto
router.put('/:id', authorization, generalExpenseController.update);

// DELETE /:id -> Eliminar un gasto
router.delete('/:id', authorization, generalExpenseController.delete);

export default router;