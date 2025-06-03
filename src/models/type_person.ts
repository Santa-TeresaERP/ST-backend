import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@config/database'
import { typePersonAttributes } from '@type/museo/type_person'
import { v4 as uuid } from 'uuid'

class TypePerson
  extends Model<typePersonAttributes, Optional<typePersonAttributes, 'id'>>
  implements typePersonAttributes
{
  public id!: string
  public name!: string
  public base_price!: number
}

TypePerson.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: uuid,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    base_price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'type_persons',
    timestamps: true,
  },
)

export default TypePerson
