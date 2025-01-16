import express from 'express'
import authorization from '@middlewares/authorization'
import userController from '@controllers/userController'

const router = express.Router()

router.post('/', authorization, userController.createUser)

router.get('/', authorization, userController.getUsers) // Ruta para obtener usuarios activos

router.get('/all', authorization, userController.getUsersAll) // Ruta para obtener todos los usuarios (activos e inactivos)

router.delete('/:id', authorization, userController.deleteUser)

// router.patch('/:id', authorization, userController.updateUser)

export default router
