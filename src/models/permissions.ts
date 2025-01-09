import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@config/database'
import { PermissionsAttributes } from '@type/permissions'
import { v4 as uuid } from 'uuid'
import Module from '@models/module'

class Permissions
  extends Model<PermissionsAttributes, Optional<PermissionsAttributes, 'id'>>
  implements PermissionsAttributes
{
  public id!: string
  public moduleId!: string
  public canRead!: boolean
  public canWrite!: boolean
  public canEdit!: boolean
  public canDelete!: boolean
}

Permissions.init(
  {
    id: { type: DataTypes.UUID, defaultValue: uuid, primaryKey: true },
    moduleId: { type: DataTypes.UUID, allowNull: false },
    canRead: { type: DataTypes.BOOLEAN, defaultValue: false },
    canWrite: { type: DataTypes.BOOLEAN, defaultValue: false },
    canEdit: { type: DataTypes.BOOLEAN, defaultValue: false },
    canDelete: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  {
    sequelize,
    tableName: 'permissions',
    timestamps: true,
  },
)

// Relación con Module
Permissions.belongsTo(Module, { foreignKey: 'moduleId' })
Module.hasMany(Permissions, { foreignKey: 'moduleId' })

export default Permissions
