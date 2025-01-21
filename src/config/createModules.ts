import Module from '@models/modules';

const createModules = async () => {
  try {
    const modules = ['Dashboard', 'Users', 'Settings', 'Reports'];
    const createdModules = await Promise.all(
      modules.map((name) =>
        Module.findOrCreate({
          where: { name },
          defaults: { name, description: `${name} module` },
        })
      )
    );
    console.log('Modules created successfully');
    return createdModules.map(([module]: [Module, boolean]) => module);
  } catch (err) {
    console.error('Error creating modules:', err);
    throw err;
  }
};

export default createModules;


// modulos, roles, permisos
