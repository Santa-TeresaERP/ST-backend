import User from '@models/user'

const serviceGetUser = async (id: string) => {
  const user = await User.findByPk(id)
  if (!user) {
    return null
  }

  const { ...userData } = user.toJSON()

  return userData
}

export default serviceGetUser
