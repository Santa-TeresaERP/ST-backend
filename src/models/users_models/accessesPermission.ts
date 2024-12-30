import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@config/database'
import { AccessesPermissionAttributes } from '@type/modules'
import { v4 as uuid } from 'uuid'
import Accesses from '@models/accesses'
import User from '@models/users_models/user'

class AccessesPermission
  extends Model<
    AccessesPermissionAttributes,
    Optional<AccessesPermissionAttributes, 'id'>
  >
  implements AccessesPermissionAttributes
{
  public id!: string
  public userId!: string
  public accessId!: string
  public value!: boolean
}

AccessesPermission.init(
  {
    id: { type: DataTypes.UUID, defaultValue: uuid, primaryKey: true },
    userId: { type: DataTypes.UUID, allowNull: false },
    accessId: { type: DataTypes.UUID, allowNull: false },
    value: { type: DataTypes.BOOLEAN, allowNull: false },
  },
  {
    sequelize,
    tableName: 'accesses_permission',
    timestamps: true,
  },
)

// Define the relationship
AccessesPermission.belongsTo(Accesses, { foreignKey: 'accessId' })
Accesses.hasMany(AccessesPermission, { foreignKey: 'accessId' })

AccessesPermission.belongsTo(User, { foreignKey: 'userId' })
User.hasMany(AccessesPermission, { foreignKey: 'userId' })

export default AccessesPermission
