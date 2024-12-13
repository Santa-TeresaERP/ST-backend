import { Op } from 'sequelize'
import bcrypt from 'bcrypt'
import { generateToken } from '@config/jwt'
import User from '@models/user'
import { jwtData, UserAttributes } from '@type/auth'

class useUser {
  static async checkUser(body: UserAttributes) {
    const { email, password } = body
    const user = await User.findOne({ where: { email } })

    if (!user) {
      return null
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return null
    }

    const { id, isAdmin, name } = user
    const tokenData: jwtData = {
      userId: id,
      isAdmin: isAdmin,
      name: name,
    }

    const token = generateToken(tokenData)
    return { user: name, token }
  }

  static async createUser(body: UserAttributes) {
    const { name, phonenumber, dni, email, password, modules, isAdmin } = body
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
      modules: modules || {
        administrativo: { access: false },
        ventas: {
          access: false,
          reposteria: false,
          manualidades: false,
          misa: false,
        },
        alquileres: {
          access: false,
          santaCatalina: false,
          goyoneche: false,
          santaMarta: false,
        },
      },
      isAdmin: isAdmin || false,
    })

    return user
  }

  static getUser() {}

  static deleteUser() {}

  static async updateUser(id: number, body: UserAttributes) {
    const userId = id
    const updatedData = body
    const user = await User.findByPk(userId)
    if (!user) {
      return null
    }
    await user.update(updatedData)

    return user
  }
}

export default useUser
