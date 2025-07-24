import { Request, Response } from 'express'
import usePermissions from '../../services/permission'

const deletePermissionController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params
    const result = await usePermissions.serviceDeletePermission(id)

    if ('error' in result) {
      res.status(404).json({ error: result.error })
      return
    }

    res.status(200).json(result)
  } catch {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export default deletePermissionController
