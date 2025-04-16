import User from '@models/user'
import bcrypt from 'bcryptjs'

const serviceChangePassword = async (
  id: string,
  currentPassword: string,
  newPassword: string,
) => {
  // Buscar al usuario por ID
  const user = await User.findByPk(id)
  if (!user) {
    return { error: 'Usuario no encontrado' } // El usuario no existe
  }

  // Verificar si la contraseña actual es correcta
  const isMatch = await bcrypt.compare(currentPassword, user.password)
  if (!isMatch) {
    return { error: 'Contraseña actual incorrecta' } // Contraseña actual no coincide
  }

  // Generar el hash de la nueva contraseña
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(newPassword, salt)

  // Actualizar la contraseña del usuario
  await user.update({ password: hashedPassword })

  return { message: 'Contraseña actualizada correctamente' }
}

export default serviceChangePassword
