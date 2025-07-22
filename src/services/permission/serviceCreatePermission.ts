import Permissions from '../../models/permissions'
import { PermissionsAttributes } from '../../types/user/permissions'
import { permissionsValidation } from '../../schemas/user/permissionsSchema'
import RolesPermissions from '../../models/rolesPermissions'

const serviceCreatePermission = async (
  body: { roleId: string } & PermissionsAttributes,
) => {
  console.log('🔍 createPermission recibido:', JSON.stringify(body, null, 2))

  const { roleId, ...permissionData } = body

  console.log('🔍 roleId extraído:', roleId)
  console.log('🔍 permissionData extraído:', permissionData)

  // Validar solo los atributos del permiso (sin roleId)
  const validation = permissionsValidation(permissionData)

  if (!validation.success) {
    console.log(
      '❌ Error de validación en createPermission:',
      validation.error.errors,
    )
    return { error: validation.error.errors }
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

export default serviceCreatePermission
