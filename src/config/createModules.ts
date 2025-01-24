import Module from '@models/modules'

// Crear módulos predeterminados
const createModules = async (options = { clean: false }) => {
  try {
    const modules = [
      {
        name: 'modulos',
        description: 'Módulo para gestionar los módulos del sistema',
      },
      {
        name: 'roles',
        description: 'Módulo para administrar los roles de los usuarios',
      },
      {
        name: 'user',
        description: 'Módulo para gestionar la información de los usuarios',
      },
    ]

    if (options.clean) {
      await Module.destroy({ where: {} })
    }

    // Crear módulos predeterminados
    const createdModules = await Promise.all(
      modules.map(({ name, description }) =>
        Module.findOrCreate({
          where: { name },
          defaults: { name, description },
        }),
      ),
    )

    console.log('Módulos creados correctamente')
    return createdModules.map(([module]) => module)
  } catch (err) {
    console.error('Error al crear módulos:', err)
    throw err
  }
}

export default createModules
