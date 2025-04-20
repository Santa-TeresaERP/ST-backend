import { Request, Response } from 'express'
import useRoles from '@services/Roles/index'

const deleteRoleController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const result = await useRoles.deleteRole(id)

    if (result?.error) {
      res.status(404).json({ error: result.error })
    }

    res.status(200).json(result)
  } catch (error) {
    console.error('Error deleting role:', error)
    res.status(500).json({
      error: 'Internal Server Error',
      message: error instanceof Error ? error.message : 'Unknown error',
    })
  }
}

export default deleteRoleController
