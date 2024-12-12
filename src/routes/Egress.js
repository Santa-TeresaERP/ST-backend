import express from 'express';
const router = express.Router();
import { createEgress, getEgresses, deleteEgress, updateEgress } from '../controllers/egressController.js';
import auth from '../middleware/auth.js';

router.post('/:type', auth, createEgress);

router.get('/:type', auth, getEgresses);

router.delete('/:type/:id', auth, deleteEgress);

router.patch('/:type/:id', auth, updateEgress);

export default router;
