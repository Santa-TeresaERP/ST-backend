import bcrypt from 'bcryptjs'
import User from '@models/user'
import { UserAttributes } from '@type/user/auth'
import { Op } from 'sequelize'
import { userValidationPartial } from 'src/schemas/user/userSchema'

const serviceCreateUser = async (body: UserAttributes) => {
  const validation = userValidationPartial(body)
  if (!validation.success) {
    return { error: validation.error.errors }
  }

  const { name, phonenumber, dni, email, password, roleId, status } = body
  let user = await User.findOne({
    where: {
      [Op.or]: [{ email }, { dni }],
    },
  })

  if (user) {
    return null
  }

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)
  user = await User.create({
    name,
    phonenumber,
    dni,
    email,
    password: hashedPassword,
    roleId,
    status,
  })

  return user
}

export default serviceCreateUser
