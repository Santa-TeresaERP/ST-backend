import { Request, Response } from 'express'
import useRoles from '@services/Roles/index'

const createRoleController = async (req: Request, res: Response) => {
  try {
    const role = await useRoles.createRole(req.body)
    res.status(201).json(role)
  } catch (error) {
    console.error('Error creating role:', error)

    if (error instanceof Error) {
      res.status(500).json({
        error: 'Internal Server Error',
        message: error.message,
      })
    } else {
      res.status(500).json({
        error: 'Internal Server Error',
        message: 'Unknown error occurred',
      })
    }
  }
}

export default createRoleController
