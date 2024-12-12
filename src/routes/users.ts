import express from 'express';
import { createUser, deleteUser, getUsers, updateUser } from '../controllers/userController.js'
import authorization from '../middlewares/authorization'

const router = express.Router()

router.post('/', authorization, createUser)

router.get('/', authorization, getUsers)

router.delete('/:id', authorization, deleteUser)

router.patch('/:id', authorization, updateUser)

export default router;
