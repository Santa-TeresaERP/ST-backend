import { DataTypes, Model } from 'sequelize'
import sequelize from '@config/database'
import { RolesPermissionsAttributes } from '@type/permissions'
import Roles from '@models/roles'
import Permissions from '@models/permissions'

class RolesPermissions
  extends Model<RolesPermissionsAttributes>
  implements RolesPermissionsAttributes
{
  public roleId!: string
  public permissionId!: string
}

RolesPermissions.init(
  {
    roleId: { type: DataTypes.UUID, allowNull: false, primaryKey: true },
    permissionId: { type: DataTypes.UUID, allowNull: false, primaryKey: true },
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
  {
    sequelize,
    tableName: 'roles_permissions',
    timestamps: false,
  },
)

RolesPermissions.belongsTo(Roles, { foreignKey: 'roleId' })
RolesPermissions.belongsTo(Permissions, { foreignKey: 'permissionId' })

// Relación Roles <-> Permissions
Roles.belongsToMany(Permissions, {
  through: RolesPermissions,
  foreignKey: 'roleId',
})
Permissions.belongsToMany(Roles, {
  through: RolesPermissions,
  foreignKey: 'permissionId',
})

export default RolesPermissions
