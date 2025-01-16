import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@config/database'
import { EgressAttributes } from '@type/egress'
import { v4 as uuid } from 'uuid'

class Egress
  extends Model<EgressAttributes, Optional<EgressAttributes, 'id'>>
  implements EgressAttributes
{
  public id!: string
  public description!: string
  public monto!: number
  public fecha!: Date
}

Egress.init(
  {
    id: { type: DataTypes.UUID, defaultValue: uuid, primaryKey: true },
    description: { type: DataTypes.STRING, allowNull: false },
    monto: { type: DataTypes.INTEGER, allowNull: false },
    fecha: { type: DataTypes.DATE, allowNull: false },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'egress',
    timestamps: false,
  },
)

export default Egress
