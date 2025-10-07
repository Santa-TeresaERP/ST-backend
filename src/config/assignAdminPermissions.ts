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

    for (const module of modules) {
      // Buscar permiso asociado a este rol y módulo
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
        // Ya existe -> forzar flags en true siempre
        const permission = (
          existingRolePermission as RolesPermissions & {
            Permission: Permission
          }
        ).Permission

        if (
          !permission.canRead ||
          !permission.canWrite ||
          !permission.canEdit ||
          !permission.canDelete
        ) {
          await permission.update({
            canRead: true,
            canWrite: true,
            canEdit: true,
            canDelete: true,
          })
          console.log(`✅ Permiso actualizado para módulo: ${module.name}`)
        } else {
          console.log(
            `🔒 Permiso ya estaba en true para módulo: ${module.name}`,
          )
        }
      } else {
        // No existe -> crearlo con todos los flags en true
        console.log(`📝 Creando permiso para módulo: ${module.name}`)
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
