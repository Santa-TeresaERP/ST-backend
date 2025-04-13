import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@config/database'
import { ModuleAttributes } from '@type/user/modules'
import { v4 as uuid } from 'uuid'

class Module
  extends Model<ModuleAttributes, Optional<ModuleAttributes, 'id'>>
  implements ModuleAttributes
{
  public id!: string
  public name!: string
  public description?: string
}

Module.init(
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
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'modules',
    timestamps: true,
  },
)

export default Module
