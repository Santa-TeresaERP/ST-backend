import { DataTypes, Model } from 'sequelize'
import sequelize from '@config/database'
import { RolesPermissionsAttributes } from '@type/modules'
import Roles from '@models/users_models/roles'
import Permissions from '@models/users_models/permissions'

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
  },
  {
    sequelize,
    tableName: 'roles_permissions',
    timestamps: false, // No necesitamos createdAt ni updatedAt en tablas de relaciones
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

export default RolesPermissions
