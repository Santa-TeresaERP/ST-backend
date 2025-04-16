import { Request, Response } from 'express'
import useRoles from '@services/Roles/index'

const getRolesController = async (_req: Request, res: Response) => {
  try {
    const roles = await useRoles.getRoles()
    res.status(200).json(roles)
  } catch (error) {
    console.error('Error getting roles:', error)
    res.status(500).json({
      error: 'Internal Server Error',
      message: error instanceof Error ? error.message : 'Unknown error',
    })
  }
}

export default getRolesController
