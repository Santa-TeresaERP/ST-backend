import changePassword from './changePassword'
import createUser from './createUser'
import deleteUser from './deleteUser'
import getUser from './getUser'
import updateUser from './updateUser'
import getUsersAll from './getUserAll'
import getUsers from './getUsers'

const userController = {
  getUser,
  getUsers,
  getUsersAll,
  createUser,
  updateUser,
  deleteUser,
  changePassword,
}

export default userController
