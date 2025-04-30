import Permissions from '@models/permissions'
import { PermissionsAttributes } from '@type/user/permissions'
import { permissionsValidation } from 'src/schemas/user/permissionsSchema'
import RolesPermissions from '@models/rolesPermissions'

class usePermissions {
  // Crear un permiso
  static async createPermission(
    body: { roleId: string } & PermissionsAttributes,
  ) {
    const { roleId, ...permissionData } = body

    // Validar solo los atributos del permiso (sin roleId)
    const validation = permissionsValidation(permissionData)

    if (!validation.success) {
      return { error: validation.error.flatten().fieldErrors }
    }

    const { moduleId, canRead, canWrite, canEdit, canDelete } = validation.data

    try {
      // Crear o actualizar el permiso
      let permission = await Permissions.findOne({ where: { moduleId } })

      if (!permission) {
        permission = await Permissions.create({
          moduleId,
          canRead,
          canWrite,
          canEdit,
          canDelete,
        })
      } else {
        await permission.update({
          canRead,
          canWrite,
          canEdit,
          canDelete,
        })
      }

      // Verificar si la relación rol-permiso ya existe
      const existingRelation = await RolesPermissions.findOne({
        where: { roleId, permissionId: permission.id },
      })

      if (!existingRelation) {
        await RolesPermissions.create({
          roleId,
          permissionId: permission.id,
        })
      }

      return {
        message: 'Permiso creado y asignado al rol con éxito',
        permission,
      }
    } catch (error) {
      console.error('Error al crear permiso y asignarlo al rol:', error)
      return { error: 'Error interno del servidor' }
    }
  }

  // Obtener todos los permisos
  static async getPermissions() {
    const permissions = await Permissions.findAll({ include: ['Module'] })
    return permissions
  }

  // Actualizar un permiso
  static async updatePermission(id: string, body: PermissionsAttributes) {
    const validation = permissionsValidation(body)

    if (!validation.success) {
      return { error: validation.error.errors }
    }

    const { moduleId, canRead, canWrite, canEdit, canDelete } = validation.data

    const permission = await Permissions.findByPk(id)
    if (!permission) {
      return { error: 'El permiso no existe' }
    }

    await permission.update({ moduleId, canRead, canWrite, canEdit, canDelete })
    return permission
  }

  // Eliminar un permiso
  static async deletePermission(id: string) {
    const permission = await Permissions.findByPk(id)

    if (!permission) {
      return { error: 'El permiso no existe' }
    }

    await permission.destroy()
    return { message: 'Permiso eliminado correctamente' }
  }
}

export default usePermissions
