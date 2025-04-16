import { Request, Response } from 'express'
import useRoles from '@services/Roles'

export async function updateRole(req: Request, res: Response) {
  try {
    const { id } = req.params
    const result = await useRoles.updateRole(id, req.body)

    if ('error' in result) {
      return res.status(400).json({ error: result.error })
    }

    if (!result) {
      return res.status(404).json({ error: 'Role not found' })
    }

    return res.status(200).json(result)
  } catch (error) {
    console.error('Error updating role:', error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}
