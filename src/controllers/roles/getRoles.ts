import { Request, Response } from 'express'
import useRoles from '@services/Roles'

export default async function getRoles(_req: Request, res: Response) {
  try {
    const roles = await useRoles.getRoles()
    res.status(200).json(roles)
  } catch {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
