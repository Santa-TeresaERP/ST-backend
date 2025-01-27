import Permission from '@models/permissions'
import Module from '@models/modules'
import RolesPermissions from '@models/rolesPermissions'

const assignAdminPermissions = async (adminRoleId: string) => {
  try {
    // Obtener todos los módulos
    const modules = await Module.findAll()

    // Asignar todos los permisos en todos los módulos al rol de administrador
    for (const module of modules) {
      const [permission] = await Permission.findOrCreate({
        where: {
          moduleId: module.id,
        },
        defaults: {
          moduleId: module.id,
          canRead: true,
          canWrite: true,
          canEdit: true,
          canDelete: true,
        },
      })

      await RolesPermissions.findOrCreate({
        where: {
          roleId: adminRoleId,
          permissionId: permission.id,
        },
        defaults: {
          roleId: adminRoleId,
          permissionId: permission.id,
        },
      })
    }

    console.log('Admin permissions assigned')
  } catch (err) {
    console.error('Error assigning admin permissions:', err)
    throw err
  }
}

export default assignAdminPermissions
