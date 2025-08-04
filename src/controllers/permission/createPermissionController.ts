import { Request, Response } from 'express'
import usePermissions from '../../services/permission'

// Crear un permiso
const createPermissionController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const result = await usePermissions.serviceCreatePermission(req.body)

    if ('error' in result) {
      res.status(400).json({ error: result.error })
      return
    }

    res.status(201).json(result)
  } catch {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export default createPermissionController
