import express from 'express'
import authorization from '@middlewares/authorization'
import userController from '@controllers/User/index'
const router = express.Router()

router.post('/', authorization, userController.createUser)

router.get('/', authorization, userController.getUsers) // Ruta para obtener usuarios activos

router.get('/all', authorization, userController.getUsersAll) // Ruta para obtener todos los usuarios (activos e inactivos)

router.get('/:id', authorization, userController.getUser)

router.put('/:id', authorization, userController.deleteUser)

router.patch('/:id', authorization, userController.updateUser)

router.patch('/changes/:id', authorization, userController.changePassword)

export default router
