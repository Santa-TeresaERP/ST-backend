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

    // Asignar todos los permisos en todos los módulos al rol de administrador
    for (const module of modules) {
      console.log(
        `📝 Creando permiso para módulo: ${module.name} (ID: ${module.id})`,
      )

      // Crear un permiso específico para el Admin con todos los permisos habilitados
      const permission = await Permission.create({
        moduleId: module.id,
        canRead: true,
        canWrite: true,
        canEdit: true,
        canDelete: true,
      })

      console.log(`✅ Permiso creado con ID: ${permission.id}`)

      const [, created] = await RolesPermissions.findOrCreate({
        where: {
          roleId: adminRoleId,
          permissionId: permission.id,
        },
        defaults: {
          roleId: adminRoleId,
          permissionId: permission.id,
        },
      })

      if (created) {
        console.log(
          `🔗 Relación rol-permiso creada para módulo: ${module.name}`,
        )
      } else {
        console.log(
          `⚠️ Relación rol-permiso ya existía para módulo: ${module.name}`,
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
