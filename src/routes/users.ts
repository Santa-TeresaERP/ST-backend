import express from 'express'
import authorization from '@middlewares/authorization'
import roleAuthorization from '@middlewares/roleAuthorization'
import userController from '@controllers/User/index'

const router = express.Router()

router.post(
  '/',
  authorization,
  roleAuthorization('canWrite', 'user'),
  userController.createUser,
)

router.get(
  '/',
  authorization,
  roleAuthorization('canRead', 'user'),
  userController.getUsers,
)

router.get(
  '/all',
  authorization,
  roleAuthorization('canRead', 'user'),
  userController.getUsersAll,
)

router.get(
  '/:id',
  authorization,
  roleAuthorization('canRead', 'user'),
  userController.getUser,
)

router.put(
  '/:id',
  authorization,
  roleAuthorization('canDelete', 'user'),
  userController.deleteUser,
)

router.patch(
  '/:id',
  authorization,
  roleAuthorization('canEdit', 'user'),
  userController.updateUser,
)

router.patch(
  '/changes/:id',
  authorization,
  roleAuthorization('canWrite', 'user'),
  userController.changePassword,
)

export default router
