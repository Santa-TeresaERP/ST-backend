import { generateToken } from '@config/jwt'
import User from '@models/user'
import { AuthRequest, jwtData } from '@type/auth'
import bcrypt from 'bcrypt'

class useUser {
  static async checkUser (body: AuthRequest) {
    try {
      const { email, password } = body.body
      const user = await User.findOne({ where: { email }})
  
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
        name: name
      }
  
      const token = generateToken(tokenData)
      return { user: name, token }
    } catch (error) {
        throw error
    }
  }
}

export default useUser
