import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@config/database'
import { salesItemAttributes } from '@type/salesItems'
import { v4 as uuid } from 'uuid'

class SaleItem
  extends Model<salesItemAttributes, Optional<salesItemAttributes, 'id'>>
  implements salesItemAttributes {
  public id!: string
  public salesId!: string
  public productId!: string
  public quantity!: number
  public price!: number
  public createdAt!: Date
}

SaleItem.init(
  {
    id: { type: DataTypes.UUID, defaultValue: uuid, primaryKey: true },
    salesId: { type: DataTypes.UUID, allowNull: false },
    productId: { type: DataTypes.UUID, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    price: { type: DataTypes.DECIMAL, allowNull: false },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  },
  {
    sequelize,
    tableName: 'sale_items',
    timestamps: true
  }
)

export default SaleItem
