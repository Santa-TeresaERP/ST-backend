import express from 'express'
import { createEgress, getEgresses, deleteEgress, updateEgress } from '../controllers/egressController.js'
import authorization from '@middleware/authorization'

const router = express.Router();

router.post('/:type', authorization, createEgress)

router.get('/:type', authorization, getEgresses)

router.delete('/:type/:id', authorization, deleteEgress)

router.patch('/:type/:id', authorization, updateEgress)

export default router
