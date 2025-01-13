import { DataTypes, Model } from 'sequelize'
import { salesItemsAttributes } from '@type/salesItems'
import sequelize from '@config/database'
import Sale from './sales'
import Product from './products'

class SaleItem
  extends Model<salesItemsAttributes>
  implements salesItemsAttributes
{
  public salesId!: string
  public productId!: string
  public quantity!: number
}

SaleItem.init(
  {
    salesId: {
      type: DataTypes.UUID,
      primaryKey: true,
      references: { model: 'sales', key: 'id' },
    },
    productId: {
      type: DataTypes.UUID,
      primaryKey: true,
      references: { model: 'products', key: 'id' },
    },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    sequelize,
    tableName: 'sales_items',
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['salesId', 'productId'],
      },
    ],
  },
)

// Define associations
SaleItem.belongsTo(Sale, { foreignKey: 'salesId' })
SaleItem.belongsTo(Product, { foreignKey: 'productId' })

export default SaleItem
