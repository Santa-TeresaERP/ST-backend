import { Op } from 'sequelize'
import bcrypt from 'bcryptjs'
import { generateToken } from '@config/jwt'
import User from '@models/users_models/user'
import { jwtData, UserAttributes } from '@type/auth'
import { userValidation, userValidationPartial } from 'src/schemas/userSchema'

class useUser {
  static async checkUser(body: UserAttributes) {
    const validation = userValidationPartial(body)
    if (validation.error) {
      return null
    }

    const { email, password } = validation.data

    const user = await User.findOne({ where: { email } })

    if (!user) {
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

  static async createUser(body: UserAttributes) {
    const validation = userValidation(body)
    if (!validation.success) {
      return { error: validation.error.errors } // Devuelve los errores de validación
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

  static async getUser(id: number) {
    const user = await User.findByPk(id)
    if (!user) {
      return null
    }
    return user
  }

  static async deleteUser(id: number) {
    const user = await User.findByPk(id)
    if (!user) {
      return null
    }

    await user.destroy()
    return { message: 'Usuario eliminado correctamente' }
  }

  static async updateUser(id: number, body: UserAttributes) {
    const validation = userValidation(body)
    if (!validation.success) {
      return { error: validation.error.errors } // Devuelve los errores de validación
    }

    const user = await User.findByPk(id)
    if (!user) {
      return null
    }

    await user.update(body)
    return user
  }
}

export default useUser
