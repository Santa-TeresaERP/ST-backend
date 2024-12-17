import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@config/database'
import { ModulesAttributes } from '@type/modules'
import { v4 as uuid } from 'uuid'

class Module
  extends Model<ModulesAttributes, Optional<ModulesAttributes, 'id'>>
  implements ModulesAttributes
{
  public id!: string
  public name!: string
}

Module.init(
  {
    id: { type: DataTypes.UUID, defaultValue: uuid, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize,
    tableName: 'modules',
    timestamps: true,
  },
)

export default Module
