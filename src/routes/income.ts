import express from 'express';
import { createIncome, deleteIncome, getIncomes, updateIncome } from '../controllers/incomeController.js';
import authorization from '../middlewares/authorization'

const router = express.Router()

router.post('/:type', authorization, createIncome)

router.get('/:type', authorization, getIncomes)

router.delete('/:type/:id', authorization, deleteIncome)

router.patch('/:type/:id', authorization, updateIncome)

export default router
