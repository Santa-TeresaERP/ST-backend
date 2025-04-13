import User from '@models/user'
import { UserAttributes } from '@type/auth'
import { userValidationPartial } from 'src/schemas/userSchema'

export async function serviceUpdateUser(
  id: string,
  body: Partial<UserAttributes>,
) {
  const validation = userValidationPartial(body)
  if (!validation.success) {
    return { error: validation.error.errors }
  }

  const user = await User.findByPk(id)
  if (!user) {
    return null
  }

  // Elimina el campo password del objeto body si existe
  const { ...updateData } = body

  await user.update(updateData)
  // Recarga el usuario para obtener los datos actualizados
  const updatedUser = await User.findByPk(id)
  return updatedUser
}
