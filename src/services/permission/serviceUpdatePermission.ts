import Permissions from '../../models/permissions'
import RolesPermissions from '../../models/rolesPermissions'
import { PermissionsAttributes } from '../../types/user/permissions'
import { permissionsValidation } from '../../schemas/user/permissionsSchema'

const serviceUpdatePermission = async (
  id: string,
  body: PermissionsAttributes | { permissions: Array<PermissionsAttributes> },
) => {
  // Verificar si es actualización múltiple
  if ('permissions' in body && Array.isArray(body.permissions)) {
    if (body.permissions.length === 0) {
      return { error: 'Se requiere al menos un permiso en el array' }
    }

    try {
      const results = []
      const errors = []

      for (const permissionData of body.permissions) {
        // Convertir canUpdate a canEdit para compatibilidad
        const normalizedPermission = {
          ...permissionData,
          canEdit:
            permissionData.canEdit ??
            (permissionData as { canUpdate?: boolean }).canUpdate ??
            false,
        }

        // Remover canUpdate si existe
        delete (normalizedPermission as { canUpdate?: boolean }).canUpdate

        const validation = permissionsValidation(normalizedPermission)

        if (!validation.success) {
          errors.push({
            moduleId: permissionData.moduleId,
            error: validation.error.errors,
          })
          continue
        }

        const { moduleId, canRead, canWrite, canEdit, canDelete } =
          validation.data

        // 🔥 BUSCAR si ya existe un permiso para este ROL + MÓDULO
        const existingRolePermission = await RolesPermissions.findOne({
          where: { roleId: id },
          include: [
            {
              model: Permissions,
              where: { moduleId },
            },
          ],
        })

        let permission
        if (!existingRolePermission) {
          // 🔥 CREAR permiso ÚNICO para este ROL + MÓDULO (nunca reutilizar)
          permission = await Permissions.create({
            moduleId,
            canRead,
            canWrite,
            canEdit,
            canDelete,
          })

          // Crear la relación rol-permiso
          await RolesPermissions.create({
            roleId: id,
            permissionId: permission.id,
          })
        } else {
          // 🔥 ACTUALIZAR permiso específico de este rol
          permission = (
            existingRolePermission as RolesPermissions & {
              Permission: Permissions
            }
          ).Permission
          await permission.update({ canRead, canWrite, canEdit, canDelete })
        }

        results.push({
          moduleId,
          permission,
          status: 'updated',
        })
      }

      return {
        message: `${results.length} permisos actualizados correctamente`,
        results,
        errors: errors.length > 0 ? errors : undefined,
      }
    } catch (error) {
      console.error('Error al actualizar múltiples permisos:', error)
      return { error: 'Error interno del servidor' }
    }
  } else {
    // Actualización individual (comportamiento original)
    const validation = permissionsValidation(body as PermissionsAttributes)

    if (!validation.success) {
      return { error: validation.error.errors }
    }

    const { moduleId, canRead, canWrite, canEdit, canDelete } = validation.data

    try {
      const permission = await Permissions.findByPk(id)
      if (!permission) {
        return { error: 'El permiso no existe' }
      }

      await permission.update({
        moduleId,
        canRead,
        canWrite,
        canEdit,
        canDelete,
      })

      return {
        message: 'Permiso actualizado correctamente',
        permission,
      }
    } catch (error) {
      console.error('Error al actualizar permiso:', error)
      return { error: 'Error interno del servidor' }
    }
  }
}

export default serviceUpdatePermission
