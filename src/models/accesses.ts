import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@config/database'
import { AccessesAttributes } from '@type/modules'
import { v4 as uuid } from 'uuid'
import Module from '@models/module'

class Accesses
  extends Model<AccessesAttributes, Optional<AccessesAttributes, 'id'>>
  implements AccessesAttributes
{
  public id!: string
  public moduleId!: string
  public name!: string
}

Accesses.init(
  {
    id: { type: DataTypes.UUID, defaultValue: uuid, primaryKey: true },
    moduleId: { type: DataTypes.UUID, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize,
    tableName: 'accesses',
    timestamps: true,
  },
)

// Define the relationship
Accesses.belongsTo(Module, { foreignKey: 'moduleId' })
Module.hasMany(Accesses, { foreignKey: 'moduleId' })

export default Accesses
