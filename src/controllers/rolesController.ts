import { Request, Response } from 'express'
import useRoles from '@services/Roles/index'

class rolesController {
  static async createRoleController(req: Request, res: Response) {
    try {
      const role = await useRoles.createRole(req.body)
      res.status(201).json(role)
    } catch (error) {
      console.error('Error creating role:', error) // Mostrar error detallado en los logs

      if (error instanceof Error) {
        res.status(500).json({
          error: 'Internal Server Error',
          message: error.message, // Acceder de manera segura a la propiedad `message`
        })
      } else {
        res.status(500).json({
          error: 'Internal Server Error',
          message: 'Unknown error occurred', // En caso de que `error` no sea un `Error` estándar
        })
      }
    }
  }

  static async getRolesController(_req: Request, res: Response) {
    try {
      const roles = await useRoles.getRoles()
      res.status(200).json(roles)
    } catch {
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  static async getRoleController(req: Request, res: Response) {
    try {
      const { id } = req.params
      const role = await useRoles.getRole(id)

      if (!role) {
        res.status(404).json({ error: 'Role not found' })
      }

      res.status(200).json(role)
    } catch {
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  static async updateRoleController(req: Request, res: Response) {
    try {
      const { id } = req.params
      const role = await useRoles.updateRole(id, req.body)

      if (!role) {
        res.status(404).json({ error: 'Role not found' })
      }

      res.status(200).json(role)
    } catch {
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  static async deleteRoleController(req: Request, res: Response) {
    try {
      const { id } = req.params
      const result = await useRoles.deleteRole(id)

      if (result.error) {
        res.status(404).json({ error: result.error })
      }

      res.status(200).json(result)
    } catch {
      res.status(500).json({ error: 'Internal Server Error' })
    }
  }
}

export default rolesController
