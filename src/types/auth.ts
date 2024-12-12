import { Request } from 'express'
import { JwtPayload } from 'jsonwebtoken'

export interface UserAttributes {
  id?: number
  name: string
  phonenumber: string
  dni: string
  email: string
  password: string
  isAdmin: boolean
  modules: Modules
  createdAt?: Date
  updatedAt?: Date
}

export interface Modules {
  ventas: Sales
  alquileres: Rentals
  administrativo: Administrative
  monasterio: Monastery
  museo: Museum
}

export interface Administrative {
  access: boolean
}

export interface Sales {
  access: boolean
  confectionery?: boolean
  crafts?: boolean
  mass?: boolean
}

export interface Rentals {
  access: boolean
  santaCatalina?: boolean
  goyoneche?: boolean
  santaMarta?: boolean
}

export interface Monastery {
  access: boolean
}

export interface Museum {
  access: boolean
}

/* On http methods */

export interface jwtData extends JwtPayload{
  userId: number
  name: string
  isAdmin: boolean
}

export interface AuthRequest extends Request {
  authUser?: jwtData
}