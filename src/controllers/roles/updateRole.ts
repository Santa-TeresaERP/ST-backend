import { Request, Response } from 'express'
import useRoles from '@services/Roles/index'

const updateRoleController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const role = await useRoles.updateRole(id, req.body)

    if (!role) {
      res.status(404).json({ error: 'Role not found' })
    }

    res.status(200).json(role)
  } catch (error) {
    console.error('Error updating role:', error)
    res.status(500).json({
      error: 'Internal Server Error',
      message: error instanceof Error ? error.message : 'Unknown error',
    })
  }
}

export default updateRoleController
