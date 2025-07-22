import Roles from '../../models/roles'
import Modules from '../../models/modules'
import Permissions from '../../models/permissions'
import RolesPermissions from '../../models/rolesPermissions'
import { RolesAttributes } from '../../types/user/roles'
import { rolesValidation } from '../../schemas/user/rolesSchema'

const serviceCreateRole = async (body: RolesAttributes) => {
  const validation = rolesValidation(body)

  if (!validation.success) {
    return { error: validation.error.errors }
  }

  const { name, description } = validation.data

  const existingRole = await Roles.findOne({ where: { name } })
  if (existingRole) {
    return { error: 'El rol ya existe' }
  }

  try {
    // Crear el nuevo rol
    const newRole = await Roles.create({ name, description })
    console.log(`✅ Rol "${name}" creado con ID: ${newRole.id}`)

    // Obtener todos los módulos existentes
    const allModules = await Modules.findAll()
    console.log(
      `🔍 Encontrados ${allModules.length} módulos para asociar permisos`,
    )

    if (allModules.length === 0) {
      console.log('⚠️ No se encontraron módulos en el sistema')
      return {
        ...newRole.toJSON(),
        message:
          'Rol creado pero no se encontraron módulos para asociar permisos',
      }
    }

    // Crear permisos por defecto para cada módulo
    const createdPermissions = []
    const errors = []

    for (const module of allModules) {
      try {
        console.log(`📝 Creando permiso para módulo: ${module.name}`)

        // Crear un nuevo permiso específico para este rol y módulo
        const permission = await Permissions.create({
          moduleId: module.id,
          canRead: false,
          canWrite: false,
          canEdit: false,
          canDelete: false,
        })

        // Crear la relación rol-permiso
        await RolesPermissions.create({
          roleId: newRole.id,
          permissionId: permission.id,
        })

        createdPermissions.push({
          moduleId: module.id,
          moduleName: module.name,
          permissionId: permission.id,
        })

        console.log(`✅ Permiso creado para módulo: ${module.name}`)
      } catch (moduleError) {
        console.error(
          `❌ Error creando permiso para módulo ${module.name}:`,
          moduleError,
        )
        errors.push({
          moduleId: module.id,
          moduleName: module.name,
          error:
            moduleError instanceof Error
              ? moduleError.message
              : String(moduleError),
        })
      }
    }

    console.log(
      `📊 Resumen: ${createdPermissions.length} permisos creados, ${errors.length} errores`,
    )

    return {
      ...newRole.toJSON(),
      message: `Rol creado exitosamente con ${createdPermissions.length} permisos asociados`,
      permissionsCreated: createdPermissions.length,
      permissionsErrors: errors.length,
      details: {
        createdPermissions,
        errors: errors.length > 0 ? errors : undefined,
      },
    }
  } catch (error) {
    console.error('❌ Error general creando rol:', error)
    return {
      error: 'Error interno del servidor al crear el rol',
      details: error instanceof Error ? error.message : String(error),
    }
  }
}

export default serviceCreateRole
