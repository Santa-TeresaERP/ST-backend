import { Response } from 'express'
import { AuthRequest } from '@type/user/auth'
import useUser from '@services/User/index'
import { HttpError } from '@errors/http'
import User from '@models/user'
import Roles from '@models/roles'
import Permission from '@models/permissions'

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

  static async getCurrentUser(req: AuthRequest, res: Response) {
    try {
      const userId = req.authUser?.userId
      if (!userId) throw new HttpError('User not authenticated', 401)

      const user = await User.findByPk(userId, {
        include: [
          {
            model: Roles,
            include: [
              {
                model: Permission,
                through: { attributes: [] }, // Exclude join table attributes
              },
            ],
          },
        ],
        attributes: { exclude: ['password'] }, // Exclude password from response
      })

      if (!user) throw new HttpError('User not found', 404)

      res.json({
        success: true,
        data: user,
      })
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
