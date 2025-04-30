import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@config/database'
import { RolesAttributes } from '@type/user/roles'
import { v4 as uuid } from 'uuid'
import Permission from './permissions'
import RolesPermissions from './rolesPermissions'

class Roles
  extends Model<
    RolesAttributes,
    Optional<RolesAttributes, 'id' | 'status' | 'createdAt' | 'updatedAt'>
  >
  // Optional fields
  implements RolesAttributes
{
  public id!: string
  public name!: string
  public description!: string
  public status!: boolean
}

Roles.init(
  {
    id: { type: DataTypes.UUID, defaultValue: uuid, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: true },
    status: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
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

RolesPermissions.belongsTo(Roles, { foreignKey: 'roleId' })
RolesPermissions.belongsTo(Permission, { foreignKey: 'permissionId' })

Roles.belongsToMany(Permission, {
  through: RolesPermissions,
  foreignKey: 'roleId',
  otherKey: 'permissionId',
})

Permission.belongsToMany(Roles, {
  through: RolesPermissions,
  foreignKey: 'permissionId',
  otherKey: 'roleId',
})

export default Roles
