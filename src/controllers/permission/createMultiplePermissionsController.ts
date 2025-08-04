import { Request, Response } from 'express'
import usePermissions from '../../services/permission'

// Crear múltiples permisos para un rol
const createMultiplePermissionsController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const result = await usePermissions.serviceCreateMultiplePermissions(
      req.body,
    )

    if ('error' in result) {
      res.status(400).json({ error: result.error })
      return
    }

    res.status(201).json(result)
  } catch {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export default createMultiplePermissionsController
