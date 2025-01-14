import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@config/database'
import { ModuleAttributes } from '@type/modules'
import { v4 as uuid } from 'uuid'

class Module
  extends Model<ModuleAttributes, Optional<ModuleAttributes, 'id'>>
  implements ModuleAttributes
{
  public id!: string
  public name!: string
  public descripcion?: string // Agrega la propiedad descripcion
}

Module.init(
  {
    id: { type: DataTypes.UUID, defaultValue: uuid, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    descripcion: { type: DataTypes.STRING, allowNull: true }, // Agrega la columna descripcion
  },
  {
    sequelize,
    tableName: 'modules',
    timestamps: true,
  },
)

export default Module
