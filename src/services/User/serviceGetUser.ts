import User from '@models/user'

export async function serviceGetUser(id: string) {
  const user = await User.findByPk(id)
  if (!user) {
    return null
  }

  const { ...userData } = user.toJSON()

  return userData
}
