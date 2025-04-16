import { Request, Response } from 'express'
import useRoles from '@services/Roles'

export default async function getRole(req: Request, res: Response) {
  try {
    const { id } = req.params
    const role = await useRoles.getRole(id)

    if (!role) {
      return res.status(404).json({ error: 'Role not found' })
    }

    return res.status(200).json(role)
  } catch (error) {
    console.error('Error getting role:', error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}
