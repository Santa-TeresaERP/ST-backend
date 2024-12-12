import express from 'express';
const router = express.Router();
import { createIncome, deleteIncome, getIncomes, updateIncome } from '../controllers/incomeController.js';
import auth from '../middleware/auth.js';

router.post('/:type', auth, createIncome);

router.get('/:type', auth, getIncomes);

router.delete('/:type/:id', auth, deleteIncome);

router.patch('/:type/:id', auth, updateIncome);

export default router;
