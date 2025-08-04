import { Request, Response } from 'express'
import useRoles from '@services/Roles'

/**
 * Obtener todos los permisos de un rol con información detallada
 */
const getRolePermissionsController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { roleId } = req.params
    const result = await useRoles.getRolePermissions(roleId)

    if ('error' in result) {
      res.status(404).json({ error: result.error })
      return
    }

    res.status(200).json(result)
  } catch (error) {
    console.error('Error al obtener permisos del rol:', error)
    res.status(500).json({
      error: 'Error interno del servidor',
    })
  }
}

export default getRolePermissionsController
