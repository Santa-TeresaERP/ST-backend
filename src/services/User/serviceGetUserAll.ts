import User from '@models/user'

export async function serviceGetUsersAll() {
  const users = await User.findAll()
  return users
}
