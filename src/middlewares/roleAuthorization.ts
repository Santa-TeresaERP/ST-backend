import { Response, NextFunction } from 'express'
import { AuthRequest } from '@type/user/auth'
import Permissions from '@models/permissions'
import RolesPermissions from '@models/rolesPermissions'
import Module from '@models/modules'

const authorizePermissions = (permission: string, moduleName: string) => {
  return async (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const user = req.authUser

      if (!user?.rolId) {
        res.status(403).json({ message: 'Unauthorized. Role ID is missing.' })
        return
      }

      const module = await Module.findOne({ where: { name: moduleName } })
      const moduleId = module?.id

      if (!moduleId) {
        throw new Error(`Module '${moduleName}' not found.`)
      }

      const rolePermissions = await RolesPermissions.findOne({
        where: {
          roleId: user.rolId,
        },
        include: [
          {
            model: Permissions,
            where: {
              moduleId: moduleId,
              [`${permission}`]: true,
            },
          },
        ],
      })

      if (!rolePermissions) {
        res
          .status(403)
          .json({ message: 'You do not have permission for this action.' })
        return
      }

      next()
    } catch (error) {
      console.error('Error in permission authorization middleware:', error)
      res.status(500).json({ message: 'Internal server error.' })
    }
  }
}

export default authorizePermissions
