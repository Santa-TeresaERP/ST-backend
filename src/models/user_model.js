import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const User = sequelize.define('user', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phonenumber: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dni: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isadmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  modules: {
    type: DataTypes.JSONB,
    defaultValue: {
      administrativo: { access: false },
      ventas: { access: false, reposteria: false, manualidades: false, misa: false },
      alquileres: { access: false, santaCatalina: false, goyoneche: false, santaMarta: false }
    }
  }
});

export default User;
