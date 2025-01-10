import { Request, Response } from 'express'
import usePermissions from '@services/usePermissions'

// Crear un permiso
export const createPermissionController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const result = await usePermissions.createPermission(req.body)

    if ('error' in result) {
      res.status(400).json({ error: result.error })
      return
    }

    res.status(201).json(result)
  } catch {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

// Obtener todos los permisos
export const getPermissionsController = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  try {
    const permissions = await usePermissions.getPermissions()
    res.status(200).json(permissions)
  } catch {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

// Actualizar un permiso
export const updatePermissionController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params
    const result = await usePermissions.updatePermission(id, req.body)

    if ('error' in result) {
      res.status(400).json({ error: result.error })
      return
    }

    res.status(200).json(result)
  } catch {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

// Eliminar un permiso
export const deletePermissionController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params
    const result = await usePermissions.deletePermission(id)

    if ('error' in result) {
      res.status(404).json({ error: result.error })
      return
    }

    res.status(200).json(result)
  } catch {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
