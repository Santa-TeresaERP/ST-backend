import Permissions from '@models/permissions'
import { PermissionsAttributes } from '@type/user/permissions'
import { permissionsValidation } from 'src/schemas/user/permissionsSchema'
import RolesPermissions from '@models/rolesPermissions'

class usePermissions {
  // Crear un permiso
  static async createPermission(
    body: { roleId: string } & PermissionsAttributes,
  ) {
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

  // Obtener todos los permisos
  static async getPermissions() {
    const permissions = await Permissions.findAll({ include: ['Module'] })
    return permissions
  }

  // Actualizar un permiso o múltiples permisos
  static async updatePermission(
    id: string,
    body: PermissionsAttributes | { permissions: Array<PermissionsAttributes> },
  ) {
    console.log('🔍 updatePermission recibido:', JSON.stringify(body, null, 2))

    // Verificar si es actualización múltiple
    if ('permissions' in body && Array.isArray(body.permissions)) {
      console.log('🔍 Actualizando múltiples permisos')

      if (body.permissions.length === 0) {
        return { error: 'Se requiere al menos un permiso en el array' }
      }

      try {
        const results = []
        const errors = []

        for (const permissionData of body.permissions) {
          console.log('🔍 Procesando permiso:', permissionData)

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
            console.log('❌ Error de validación:', validation.error.errors)
            errors.push({
              moduleId: permissionData.moduleId,
              error: validation.error.errors,
            })
            continue
          }

          const { moduleId, canRead, canWrite, canEdit, canDelete } =
            validation.data

          // Buscar el permiso por moduleId
          const permission = await Permissions.findOne({ where: { moduleId } })

          if (!permission) {
            errors.push({
              moduleId,
              error: 'Permiso no encontrado para este módulo',
            })
            continue
          }

          await permission.update({ canRead, canWrite, canEdit, canDelete })

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
      console.log('🔍 Actualizando permiso individual')

      const validation = permissionsValidation(body as PermissionsAttributes)

      if (!validation.success) {
        return { error: validation.error.errors }
      }

      const { moduleId, canRead, canWrite, canEdit, canDelete } =
        validation.data

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
      return permission
    }
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

  // Crear múltiples permisos para un rol
  static async createMultiplePermissions(body: {
    roleId: string
    permissions: Array<{
      moduleId: string
      canRead?: boolean
      canWrite?: boolean
      canEdit?: boolean
      canDelete?: boolean
    }>
  }) {
    console.log(
      '🔍 createMultiplePermissions recibido:',
      JSON.stringify(body, null, 2),
    )

    const { roleId, permissions } = body

    if (!roleId) {
      return { error: 'roleId es requerido' }
    }

    if (
      !permissions ||
      !Array.isArray(permissions) ||
      permissions.length === 0
    ) {
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
}

export default usePermissions
