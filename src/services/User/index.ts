import serviceChangePassword from '../../services/User/serviceChangePassword'
import serviceCheckUser from '../../services/User/serviceCheckUser'
import serviceCreateUser from '../../services/User/serviceCreateUser'
import serviceDeleteUser from '../../services/User/serviceDeleteUser'
import serviceGetUsersAll from '../../services/User/serviceGetUserAll'
import serviceGetUser from '../../services/User/serviceGetUser'
import serviceGetUsers from '../../services/User/serviceGetUsers'
import serviceUpdateUser from '../../services/User/serviceUpdateUser'

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
