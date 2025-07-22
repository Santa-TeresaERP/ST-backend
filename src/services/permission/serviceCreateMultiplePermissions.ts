import Permissions from '../../models/permissions'
import { permissionsValidation } from '../../schemas/user/permissionsSchema'
import RolesPermissions from '../../models/rolesPermissions'

const serviceCreateMultiplePermissions = async (body: {
  roleId: string
  permissions: Array<{
    moduleId: string
    canRead?: boolean
    canWrite?: boolean
    canEdit?: boolean
    canDelete?: boolean
  }>
}) => {
  console.log(
    '🔍 createMultiplePermissions recibido:',
    JSON.stringify(body, null, 2),
  )

  const { roleId, permissions } = body

  if (!roleId) {
    return { error: 'roleId es requerido' }
  }

  if (!permissions || !Array.isArray(permissions) || permissions.length === 0) {
    return { error: 'Se requiere al menos un permiso en el array' }
  }

  try {
    const results = []
    const errors = []

    for (const permissionData of permissions) {
      console.log('🔍 Procesando permiso:', permissionData)

      // Validar cada permiso individualmente
      const validation = permissionsValidation({
        moduleId: permissionData.moduleId,
        canRead: permissionData.canRead ?? false,
        canWrite: permissionData.canWrite ?? false,
        canEdit: permissionData.canEdit ?? false,
        canDelete: permissionData.canDelete ?? false,
      })

      console.log(
        '🔍 Resultado de validación:',
        validation.success,
        validation.error?.errors,
      )

      if (!validation.success) {
        console.log(
          '❌ Error de validación para módulo:',
          permissionData.moduleId,
        )
        errors.push({
          moduleId: permissionData.moduleId,
          error: validation.error.errors,
        })
        continue
      }

      const { moduleId, canRead, canWrite, canEdit, canDelete } =
        validation.data

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

      results.push({
        moduleId,
        permission,
        status: 'success',
      })
    }

    return {
      message: `${results.length} permisos procesados correctamente`,
      results,
      errors: errors.length > 0 ? errors : undefined,
    }
  } catch (error) {
    console.error('Error al crear múltiples permisos:', error)
    return { error: 'Error interno del servidor' }
  }
}

export default serviceCreateMultiplePermissions
