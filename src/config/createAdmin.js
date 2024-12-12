import bcrypt from 'bcryptjs';
import User from '../models/user_model.js';
import dotenv from 'dotenv';

dotenv.config();

const createAdmin = async () => {
  try {
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const [created] = await User.findOrCreate({
      where: { email },
      defaults: {
        name: 'Admin',
        phonenumber: '0000000000',
        dni: '12345678',
        email,
        password: hashedPassword,
        isadmin: true,
        modules: {
          ventas: { access: true },
          alquiler: { access: true },
          monasterio: { access: true },
          museo: { access: true },
          administrador: { access: true }
        }
      }
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
