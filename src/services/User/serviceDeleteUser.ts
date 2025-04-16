import User from '@models/user'

const serviceDeleteUser = async (id: string) => {
  const user = await User.findByPk(id)
  if (!user) {
    return null
  }

  await user.update({ status: false })
  return { message: 'Usuario eliminado correctamente' }
}

export default serviceDeleteUser
