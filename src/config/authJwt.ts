import { SECRET_KEY } from '@environments'
import { jwtData } from '@type/user/auth'
import jwt from 'jsonwebtoken'

export const generateToken = (data: jwtData) =>
  jwt.sign(data, SECRET_KEY!, { expiresIn: '1y' })

export const validateToken = (token: string) => {
  try {
    const decodedToken = jwt.verify(token, SECRET_KEY!) as jwtData
    return decodedToken
  } catch {
    return null
  }
}
