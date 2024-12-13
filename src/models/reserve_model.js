import { DataTypes } from 'sequelize'
import sequelize from '../config/database'
import Local from './local_model.js'

const Reserva = sequelize.define('reserva', {
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  evento: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nombre_cliente: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telefono_cliente: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email_cliente: {
    type: DataTypes.STRING,
    allowNull: false,
  },
})

Reserva.belongsTo(Local)
Local.hasMany(Reserva)

export default Reserva
