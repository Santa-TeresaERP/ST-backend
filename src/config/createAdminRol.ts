import Role from '@models/roles';
import { v4 as uuid } from 'uuid';

const createAdminRol = async () => {
  try {
    const [role, created] = await Role.findOrCreate({
      where: { name: 'Admin' },
      defaults: {
        id: uuid(),
        name: 'Admin',
        description: 'Administrator role with full access',
      },
    });

    if (created) {
      console.log('Admin role created');
    } else {
      console.log('Admin role already exists');
    }
    return role.id;
  } catch (err) {
    console.error('Error creating admin role:', err);
    throw new Error('Unable to create admin role');
  }
};

export default createAdminRol;
