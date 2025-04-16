import bcrypt from 'bcryptjs'
import { generateToken } from '@config/jwt'
import User from '@models/user'
import { jwtData, UserAttributes } from '@type/user/auth'
import { userValidationPartial } from 'src/schemas/user/userSchema'

const serviceCheckUser = async (body: UserAttributes) => {
  const validation = userValidationPartial(body)
  if (validation.error) {
    return null
  }

  const { email, password } = validation.data

  const user = await User.findOne({ where: { email } })

  //Verifica que el ususario exista y este activo
  if (!user || !user.status) {
    return null
  }

  const isMatch = await bcrypt.compare(password!, user.password)

  if (!isMatch) {
    return null
  }

  const { id, roleId, name } = user
  const tokenData: jwtData = {
    userId: id,
    rolId: roleId,
    name: name,
  }

  const token = generateToken(tokenData)
  return { user: name, token }
}

export default serviceCheckUser
