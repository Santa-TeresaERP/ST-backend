import serviceChangePassword from 'src/services/User/serviceChangePassword'
import serviceCheckUser from 'src/services/User/serviceCheckUser'
import serviceCreateUser from 'src/services/User/serviceCreateUser'
import serviceDeleteUser from 'src/services/User/serviceDeleteUser'
import serviceGetUsersAll from 'src/services/User/serviceGetUserAll'
import serviceGetUser from 'src/services/User/serviceGetUser'
import serviceGetUsers from 'src/services/User/serviceGetUsers'
import serviceUpdateUser from 'src/services/User/serviceUpdateUser'

const useUser = {
  serviceChangePassword,
  serviceCheckUser,
  serviceCreateUser,
  serviceDeleteUser,
  serviceGetUsersAll,
  serviceGetUser,
  serviceGetUsers,
  serviceUpdateUser,
}

export default useUser
