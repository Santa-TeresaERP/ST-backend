import User from '@models/user'


export async function serviceGetUsers() {
  const users = await User.findAll({ where: { status: true } })
  return users
}