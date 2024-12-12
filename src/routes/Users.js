import express from 'express';
const router = express.Router();
import { createUser, deleteUser, getUsers, updateUser } from '../controllers/userController.js';
import auth from '../middleware/auth.js';

router.post('/', auth, createUser);

router.get('/', auth, getUsers);

router.delete('/:id', auth, deleteUser);

router.patch('/:id', auth, updateUser);


export default router;
    