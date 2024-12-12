import { Response } from 'express'
import { AuthRequest } from '../types/auth'
import useUser from '../services/useUser'
import { HttpError } from '../errors/http'

export class authController {
  static async login (req: AuthRequest, res: Response) {
    try {
      const token = await useUser.checkUser(req)
      if (!token) throw new HttpError('Incorrect credentials', 400)

      res.json(token)
    } catch (error) {
      if (error instanceof HttpError) { 
        res.status(error.statusCode).json({ error: error.message })
      } else {
        res.status(500).json({ error: 'Something was wrong' })
      }
    }
  }
}
