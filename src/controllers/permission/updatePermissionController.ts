import { Request, Response } from 'express'
import usePermissions from '../../services/permission'

// Actualizar un permiso
const updatePermissionController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { roleId } = req.params
    const result = await usePermissions.serviceUpdatePermission(
      roleId,
      req.body,
    )

    if ('error' in result) {
      res.status(400).json({ error: result.error })
      return
    }

    res.status(200).json(result)
  } catch {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export default updatePermissionController
