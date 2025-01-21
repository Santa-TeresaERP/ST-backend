import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@config/database'
import { RolesAttributes } from '@type/roles'
import { v4 as uuid } from 'uuid'
import Permissions from './permission'
import RolesPermissions from './rolePermission'

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

// Relación Roles <-> Permissions
Roles.belongsToMany(Permissions, {
  through: RolesPermissions,
  foreignKey: 'roleId',
})
Permissions.belongsToMany(Roles, {
  through: RolesPermissions,
  foreignKey: 'permissionId',
})

export default Roles
