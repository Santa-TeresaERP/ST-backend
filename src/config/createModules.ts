import Module from '@models/modules'
import Role from '@models/roles'

// Crear roles y módulos predeterminados
const createModulesAndRoles = async (options = { clean: false }) => {
  try {
    const modules = ['Dashboard', 'Users', 'Settings', 'Reports']
    const roles = ['Admin', 'User']

    if (options.clean) {
      await Promise.all([
        Module.destroy({ where: {} }),
        Role.destroy({ where: {} }),
      ])
    }

    // Crear roles predeterminados
    const createdRoles = await Promise.all(
      roles.map((roleName) =>
        Role.findOrCreate({
          where: { name: roleName },
          defaults: { name: roleName, description: `${roleName} role` },
        }),
      ),
    )

    // Crear módulos predeterminados
    const createdModules = await Promise.all(
      modules.map((name) =>
        Module.findOrCreate({
          where: { name },
          defaults: { name, description: `${name} module` },
        }),
      ),
    )

    console.log('Roles y módulos creados correctamente')
    return {
      modules: createdModules.map(([module]) => module),
      roles: createdRoles.map(([role]) => role),
    }
  } catch (err) {
    console.error('Error al crear roles y módulos:', err)
    throw err
  }
}

export default createModulesAndRoles
