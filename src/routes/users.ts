import express from 'express'
import authorization from '@middlewares/authorization'
import { createUser } from '@controllers/User/createUser'
import {getUsers} from '@controllers/User/getUsers'
import {getUsersAll} from '@controllers/User/getUserAll'
import {getUser} from '@controllers/User/getUser'
import {deleteUser} from '@controllers/User/deleteUser'
import {updateUser} from '@controllers/User/updateUser'
import {changePassword} from '@controllers/User/changePassword'

const router = express.Router()

router.post('/', authorization, createUser)

router.get('/', authorization, getUsers) // Ruta para obtener usuarios activos

router.get('/all', authorization, getUsersAll) // Ruta para obtener todos los usuarios (activos e inactivos)

router.get('/:id', authorization, getUser)

router.put('/:id', authorization, deleteUser)

router.patch('/:id', authorization, updateUser)

router.patch('/changes/:id', authorization, changePassword)

export default router
