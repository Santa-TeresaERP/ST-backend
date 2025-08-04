import Roles from '../../models/roles'
import Permissions from '../../models/permissions'
import Modules from '../../models/modules'

const serviceGetRolePermissions = async (roleId: string) => {
  console.log('🔍 Consultando permisos para rol:', roleId)

  try {
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
      return { error: 'Rol no encontrado' }
    }

    // Formatear la respuesta para que sea más legible
    const permissions =
      (role as Roles & { Permissions: Permissions[] }).Permissions || []

    const rolePermissions = {
      role: {
        id: role.id,
        name: role.name,
      },
      permissions: permissions.map((permission) => ({
        id: permission.id,
        moduleId: permission.moduleId,
        moduleName:
          (permission as Permissions & { Module: { name: string } }).Module
            ?.name || 'Módulo sin nombre',
        canRead: permission.canRead,
        canWrite: permission.canWrite,
        canEdit: permission.canEdit,
        canDelete: permission.canDelete,
      })),
      totalPermissions: permissions.length,
    }

    console.log('📊 Permisos encontrados:', rolePermissions.totalPermissions)

    return {
      message: 'Permisos del rol obtenidos correctamente',
      data: rolePermissions,
    }
  } catch (error) {
    console.error('Error al obtener permisos del rol:', error)
    return { error: 'Error interno del servidor' }
  }
}

export default serviceGetRolePermissions
