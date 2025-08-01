import express from 'express';
import authorization from '@middlewares/authorization';

// Se importa el controlador específico para GeneralIncome
import generalIncomeController from '@controllers/GeneralIncome';

const router = express.Router();

// La ruta base será /api/finanzas/incomes (definida en el index de rutas de finanzas)

// POST / -> Crear un nuevo ingreso
router.post('/', authorization, generalIncomeController.create);

// GET / -> Obtener todos los ingresos
router.get('/', authorization, generalIncomeController.getAll);

// GET /:id -> Obtener un ingreso por ID
router.get('/:id', authorization, generalIncomeController.getById);

// PUT /:id -> Actualizar un ingreso
router.put('/:id', authorization, generalIncomeController.update);

// DELETE /:id -> Eliminar un ingreso
router.delete('/:id', authorization, generalIncomeController.delete);

export default router;