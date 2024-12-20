import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@config/database'
import { RolesAttributes } from '@type/modules'
import { v4 as uuid } from 'uuid'

class Roles
  extends Model<RolesAttributes, Optional<RolesAttributes, 'id'>>
  implements RolesAttributes
{
  public id!: string
  public name!: string
  public descripcion!: string
}

Roles.init(
  {
    id: { type: DataTypes.UUID, defaultValue: uuid, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    descripcion: { type: DataTypes.STRING, allowNull: true },
  },
  {
    sequelize,
    tableName: 'roles',
    timestamps: true,
  },
)

export default Roles