import { Request, Response } from 'express'
import useRoles from '@services/Roles'

const getRoleController = async (req: Request, res: Response) => {
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

export default getRoleController
