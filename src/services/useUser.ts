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
