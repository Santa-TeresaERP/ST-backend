import { DataTypes, Model } from 'sequelize'
import sequelize from '@config/database'
import { RolesPermissionsAttributes } from '@type/user/permissions'

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

export default RolesPermissions
