import Permission from '@models/permissions'
import Module from '@models/modules'
import RolesPermissions from '@models/rolesPermissions'

const assignAdminPermissions = async (adminRoleId: string) => {
  try {
    console.log(`🔧 Asignando permisos al rol Admin ID: ${adminRoleId}`)

    // Obtener todos los módulos
    const modules = await Module.findAll()
    console.log(`📋 Encontrados ${modules.length} módulos`)

    if (modules.length === 0) {
      console.log('⚠️ No se encontraron módulos')
      return
    }

    // Asignar o actualizar todos los permisos en todos los módulos al rol de administrador
    for (const module of modules) {
      // Buscar si ya existe un permiso para este rol y módulo
      const existingRolePermission = await RolesPermissions.findOne({
        where: { roleId: adminRoleId },
        include: [
          {
            model: Permission,
            where: { moduleId: module.id },
          },
        ],
      })

      if (existingRolePermission) {
        // Si ya existe, actualizarlo para asegurar que todo esté en true
        const permission = (
          existingRolePermission as RolesPermissions & {
            Permission: Permission
          }
        ).Permission
        await permission.update({
          canRead: true,
          canWrite: true,
          canEdit: true,
          canDelete: true,
        })
        console.log(`✅ Permiso actualizado para módulo: ${module.name}`)
      } else {
        // Si no existe, crear el permiso y la relación
        console.log(
          `📝 Creando permiso para módulo: ${module.name} (ID: ${module.id})`,
        )
        const permission = await Permission.create({
          moduleId: module.id,
          canRead: true,
          canWrite: true,
          canEdit: true,
          canDelete: true,
        })

        await RolesPermissions.create({
          roleId: adminRoleId,
          permissionId: permission.id,
        })
        console.log(
          `🔗 Relación rol-permiso creada para módulo: ${module.name}`,
        )
      }
    }

    console.log('✅ Admin permissions assigned successfully')
  } catch (err) {
    console.error('❌ Error assigning admin permissions:', err)
    throw err
  }
}

export default assignAdminPermissions
