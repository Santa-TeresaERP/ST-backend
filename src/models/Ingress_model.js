import { DataTypes } from 'sequelize'
import sequelize from '../config/database'
import Producto from './product_craft_model.js'

const Ingreso = sequelize.define('ingreso', {
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
})

Ingreso.belongsTo(Producto)
Producto.hasMany(Ingreso)

export default Ingreso
