import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@config/database'
import { returnsAttributes } from '@type/ventas/returns'
import Product from '@models/product'
import Sale from '@models/sale'
import { v4 as uuid } from 'uuid'

class Return
  extends Model<returnsAttributes, Optional<returnsAttributes, 'id'>>
  implements returnsAttributes
{
  public id!: string
  public productId!: string
  public salesId!: string
  public reason!: string
  public observations!: string
  public createdAt!: Date
  public updatedAt!: Date
}

Return.init(
  {
    id: { type: DataTypes.UUID, defaultValue: uuid, primaryKey: true },
    productId: { type: DataTypes.UUID, allowNull: false },
    salesId: { type: DataTypes.UUID, allowNull: false },
    reason: { type: DataTypes.STRING, allowNull: false },
    observations: { type: DataTypes.STRING, allowNull: true },
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
    tableName: 'returns',
    timestamps: true,
  },
)

Product.hasMany(Return, { foreignKey: 'productId', as: 'returns' })
Return.belongsTo(Product, { foreignKey: 'productId', as: 'product' })
Sale.hasMany(Return, { foreignKey: 'salesId', as: 'returns' })
Return.belongsTo(Sale, { foreignKey: 'salesId', as: 'sale' })

export default Return
