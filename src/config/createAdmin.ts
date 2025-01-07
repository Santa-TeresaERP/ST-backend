import User from '@models/user';
import bcrypt from 'bcryptjs';
import { ADMIN_EMAIL, ADMIN_PASSWORD } from '@environments';
import createAdminRol from './createAdminRol'

const createAdmin = async () => {
  try {
    const email = ADMIN_EMAIL;
    const password = ADMIN_PASSWORD;

    if (!email || !password) {
      throw new Error('ADMIN_EMAIL or ADMIN_PASSWORD is not defined');
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const adminRoleId = await createAdminRol();
    const [created] = await User.findOrCreate({
      where: { email },
      defaults: {
        name: 'Admin',
        phonenumber: '0000000000',
        dni: '12345678',
        email,
        password: hashedPassword,
        roleId: adminRoleId,
      },
    });

    if (created) {
      console.log('Admin user created');
    } else {
      console.log('Admin user already exists');
    }
  } catch (err) {
    console.error('Error creating admin:', err);
  }
};

export default createAdmin;
