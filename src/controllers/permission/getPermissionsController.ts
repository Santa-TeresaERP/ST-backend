import { Request, Response } from 'express'
import usePermissions from '../../services/permission'

const getPermissionsController = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  try {
    const permissions = await usePermissions.serviceGetPermissions()
    res.status(200).json(permissions)
  } catch {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export default getPermissionsController
