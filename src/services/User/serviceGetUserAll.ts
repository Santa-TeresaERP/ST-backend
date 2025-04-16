import User from '@models/user'

const serviceGetUsersAll = async () => {
  const users = await User.findAll()
  return users
}

export default serviceGetUsersAll
