import User from '@models/user'

const serviceGetUsers = async () => {
  const users = await User.findAll({ where: { status: true } })
  return users
}

export default serviceGetUsers
