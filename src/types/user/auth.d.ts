import { Request } from 'express'
import { JwtPayload } from 'jsonwebtoken'

export interface UserAttributes {
  id?: string
  name: string
  dni: string
  phonenumber: string
  email: string
  roleId?: string
  password: string
  createdAt?: Date
  updatedAt?: Date
  status?: boolean
}

/* On http methods */

export interface jwtData extends JwtPayload {
  userId: string
  name: string
  rolId: string
}

export interface AuthRequest extends Request {
  authUser?: jwtData
}
