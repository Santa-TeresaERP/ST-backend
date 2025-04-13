import User from '@models/user'

export async function serviceDeleteUser(id: string) {
  const user = await User.findByPk(id)
  if (!user) {
    return null
  }

  await user.update({ status: false })
  return { message: 'Usuario eliminado correctamente' }
}