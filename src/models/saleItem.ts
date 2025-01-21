import { DataTypes, Model } from 'sequelize'
import sequelize from '@config/database'
import { salesItemsAttributes } from '@type/salesItem'
import Product from '@models/product'

class salesItem
  extends Model<salesItemsAttributes>
  implements salesItemsAttributes
{
  public salesId!: string
  public productId!: string
  public quantity!: number
  public createdAt!: Date
  public updatedAt!: Date
}

salesItem.init(
  {
    salesId: { type: DataTypes.UUID, allowNull: false },
    productId: { type: DataTypes.UUID, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
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
    tableName: 'salesItems',
    timestamps: true,
  },
)

salesItem.belongsTo(Product, { foreignKey: 'productId', as: 'product' })
Product.hasMany(salesItem, { foreignKey: 'productId', as: 'salesItems' })

export default salesItem
