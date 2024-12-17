import { Request } from 'express'
import { JwtPayload } from 'jsonwebtoken'

export interface UserAttributes {
  id?: string
  name: string
  email: string
  phonenumber: string
  dni: string
  password: string
  isAdmin: boolean
  enabled: boolean
  createdAt?: Date
  updatedAt?: Date
}

/* On http methods */

export interface jwtData extends JwtPayload {
  userId: string
  name: string
  isAdmin: boolean
}

export interface AuthRequest extends Request {
  authUser?: jwtData
}
