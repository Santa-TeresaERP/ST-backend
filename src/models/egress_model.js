import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Egress = sequelize.define('egreso', {
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  monto: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  }
});

export default Egress;
