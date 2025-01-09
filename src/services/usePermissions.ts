import Permissions from '@models/permissions'
import { PermissionsAttributes } from '@type/permissions'
import { permissionsValidation } from 'src/schemas/permissionsSchema'

class usePermissions {
  // Crear un permiso
  static async createPermission(body: PermissionsAttributes) {
    const validation = permissionsValidation(body)

    if (!validation.success) {
      return { error: validation.error.flatten().fieldErrors }
    }

    const { id, moduleId, canRead, canWrite, canEdit, canDelete } =
      validation.data

    const existingPermission = await Permissions.findOne({ where: { id } })
    if (existingPermission) {
      return { error: 'El permiso ya existe' }
    }

    const newPermission = await Permissions.create({
      id,
      moduleId,
      canRead,
      canWrite,
      canEdit,
      canDelete,
    })

    return newPermission
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
