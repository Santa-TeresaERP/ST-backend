import { Request, Response } from 'express'
import usePermissions from '../../services/permission'

// Obtener todos los permisos
const getPermissionsController = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  try {
    const result = await usePermissions.serviceGetPermissions()

    if (result.success) {
      res.status(200).json(result.data)
    } else {
      res.status(500).json({ error: result.error })
    }
  } catch {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export default getPermissionsController
