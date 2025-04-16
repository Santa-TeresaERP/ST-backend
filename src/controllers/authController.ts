import { Response } from 'express'
import { AuthRequest } from '@type/user/auth'
import useUser from '@services/user/index'
import { HttpError } from '@errors/http'

class authController {
  static async login(req: AuthRequest, res: Response) {
    try {
      const token = await useUser.serviceCheckUser(req.body)
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

export default authController
