import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@config/database'
import { RolesAttributes } from '@type/roles'
import { v4 as uuid } from 'uuid'

class Roles
  extends Model<RolesAttributes, Optional<RolesAttributes, 'id'>>
  implements RolesAttributes
{
  public id!: string
  public name!: string
  public description!: string
}

Roles.init(
  {
    id: { type: DataTypes.UUID, defaultValue: uuid, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: true },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'roles',
    timestamps: true,
  },
)

export default Roles
