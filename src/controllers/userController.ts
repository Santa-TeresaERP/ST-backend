import useUser from '@services/useUser'
import User from '@models/user'
import { Response } from 'express'
import { AuthRequest as Request } from '@type/auth'
import { HttpError } from '@errors/http'

class userController {
  static async createUser(req: Request, res: Response) {
    try {
      const user = await useUser.createUser(req.body)
      if (!user) throw new HttpError('User alredy exists', 400)

      res.status(201).json({ message: 'User created successfully', user })
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.statusCode).json({ error: error.message })
      } else {
        res.status(500).json({ error: 'Internal server error' })
      }
    }
  }

  static async getUsers(_req: Request, res: Response) {
    try {
      const users = await User.findAll()
      res.json(users)
    } catch (error) {
      console.error('Error al obtener usuarios:', error)
      res.status(500).json({ message: 'Error al obtener usuarios' })
    }
  }

  static async deleteUser(req: Request, res: Response) {
    try {
      const userId = req.params.id
      await User.destroy({ where: { id: userId } })
      res.json({ message: 'Usuario eliminado' })
    } catch (error) {
      console.error('Error al eliminar usuario:', error)
      res.status(500).json({ message: 'Error al eliminar usuario' })
    }
  }

  static async updateUser(req: Request, res: Response) {
    try {
      const user = useUser.updateUser(req.params.id, req.body)
      if (!user) throw new HttpError('Error to updating user', 400)

      res.json({ message: 'User updated', user })
    } catch (error) {
      if (error instanceof HttpError) {
        res.status(error.statusCode).json(error.message)
      } else {
        res.status(500).json({ error: 'Internal server error' })
      }
    }
  }
  static async changePassword(req: Request, res: Response) {
    try {
      const { currentPassword, newPassword } = req.body
      const userId = req.params.id

      const result = await useUser.changePassword(
        userId,
        currentPassword,
        newPassword,
      )

      if (result.error) {
        res.status(400).json({ error: result.error }) // Error en la operación
      } else {
        res.json({ message: result.message }) // Contraseña cambiada con éxito
      }
    } catch (error) {
      console.error('Error al cambiar contraseña:', error)
      res.status(500).json({ message: 'Error al cambiar contraseña' })
    }
  }
}

export default userController
