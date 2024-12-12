import { environments } from './environments'
import { jwtData } from '../types/auth'
import jwt from 'jsonwebtoken'


export const generateToken = (data : jwtData) => jwt.sign(data, environments.SECRET_KEY, { expiresIn: '1y' })

export const validateToken = (token: string) => {
  try {
    const decodedToken = jwt.verify(token, environments.SECRET_KEY) as jwtData
    return decodedToken
  } catch (error) {
    return null
  }
}
