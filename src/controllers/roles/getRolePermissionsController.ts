import { Request, Response } from 'express'
import Roles from '@models/roles'
import Permissions from '@models/permissions'
import Modules from '@models/modules'

/**
 * Obtener todos los permisos de un rol con información detallada
 */
export const getRolePermissionsController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { roleId } = req.params

    console.log('🔍 Consultando permisos para rol:', roleId)

    // Buscar el rol con sus permisos y módulos
    const role = await Roles.findByPk(roleId, {
      include: [
        {
          model: Permissions,
          through: { attributes: [] }, // No mostrar la tabla intermedia
          include: [
            {
              model: Modules,
              as: 'Module',
              attributes: ['id', 'name'],
            },
          ],
        },
      ],
    })

    if (!role) {
      return res.status(404).json({
        error: 'Rol no encontrado',
      })
    }

    // Formatear la respuesta para que sea más legible
    const rolePermissions = {
      role: {
        id: role.id,
        name: role.name,
      },
      permissions:
        (role as any).Permissions?.map((permission: any) => ({
          id: permission.id,
          moduleId: permission.moduleId,
          moduleName: permission.Module?.name || 'Módulo sin nombre',
          canRead: permission.canRead,
          canWrite: permission.canWrite,
          canEdit: permission.canEdit,
          canDelete: permission.canDelete,
        })) || [],
      totalPermissions: (role as any).Permissions?.length || 0,
    }

    console.log('📊 Permisos encontrados:', rolePermissions.totalPermissions)

    return res.status(200).json(rolePermissions)
  } catch (error) {
    console.error('Error al obtener permisos del rol:', error)
    return res.status(500).json({
      error: 'Error interno del servidor',
    })
  }
}
