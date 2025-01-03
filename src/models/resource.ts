import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@config/database'
import { resourceAttributes } from '@type/resource'
import { v4 as uuid } from 'uuid'

class resource
  extends Model<resourceAttributes, Optional<resourceAttributes, 'id'>>
  implements resourceAttributes
{
  public id!: string
  public name!: string
  public quantity!: number
  public unitPrice!: number
  public totalCost!: number
  public supplier!: string
  public purchaseDate!: string
  public observation!: string
}

resource.init(
  {
    id: { type: DataTypes.UUID, defaultValue: uuid, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    unitPrice: { type: DataTypes.FLOAT, allowNull: false },
    totalCost: { type: DataTypes.FLOAT, allowNull: false },
    supplier: { type: DataTypes.STRING, allowNull: false },
    purchaseDate: { type: DataTypes.DATE, allowNull: false },
    observation: { type: DataTypes.STRING, allowNull: true },
  },
  {
    sequelize,
    tableName: 'resources',
    timestamps: true,
  },
)

export default resource
