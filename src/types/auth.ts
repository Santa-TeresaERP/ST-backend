import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface jwtData extends JwtPayload{
  user_id: number
  username: string
  is_admin: boolean
}

export interface AuthRequest extends Request {
  authUser?: jwtData
}