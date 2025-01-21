import { Response, NextFunction } from 'express'
import { AuthRequest } from '@type/auth'
import { HttpError } from '@errors/http'
import User from '@models/user'
import Roles from '@models/role'

const roleAuthorization = (requiredRole: string) => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { authUser } = req
      if (!authUser || !authUser.id) {
        throw new HttpError('Usuario no autenticado', 401)
      }

      // Obtener el usuario con su rol
      const user = await User.findByPk(authUser.id, {
        include: { model: Roles, as: 'role' },
      })

      if (!user || !user.roleId) {
        throw new HttpError('Rol no asignado o usuario no encontrado', 403)
      }

      // Validar el rol del usuario
      if (user.roleId !== requiredRole) {
        throw new HttpError(
          `Permiso denegado. Se requiere el rol: ${requiredRole}`,
          403,
        )
      }

      next()
    } catch (err) {
      if (err instanceof HttpError) {
        res.status(err.statusCode).json({ error: err.message })
      } else {
        res.status(500).json({ error: 'Algo salió mal' })
      }
    }
  }
}

export default roleAuthorization
