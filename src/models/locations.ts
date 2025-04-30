import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@config/database'
import { LocationAttributes } from '@type/alquiler/locations'
import { v4 as uuid } from 'uuid'

class Location
  extends Model<LocationAttributes, Optional<LocationAttributes, 'id'>>
  implements LocationAttributes
{
  public id!: string
  public name!: string
  public address!: string
  public capacity!: number
  public status!: string
}

Location.init(
  {
    id: { type: DataTypes.UUID, defaultValue: uuid, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.STRING, allowNull: false },
    capacity: { type: DataTypes.INTEGER, allowNull: false },
    status: { type: DataTypes.STRING, allowNull: false },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  { sequelize, tableName: 'locations', timestamps: true },
)

export default Location
