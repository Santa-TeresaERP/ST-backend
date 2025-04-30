import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@config/database'
import { SaleDetailAttributes } from '@type/ventas/saleDetail'
import { v4 as uuid } from 'uuid'
import Sale from '@models/sale'
import Product from '@models/product'

class saleDetail
  extends Model<SaleDetailAttributes, Optional<SaleDetailAttributes, 'id'>>
  implements SaleDetailAttributes
{
  public id!: string
  public saleId!: string
  public productId!: string
  public quantity!: number
  public mount!: number
  public createdAt!: Date
  public updatedAt!: Date
}

saleDetail.init(
  {
    id: { type: DataTypes.UUID, defaultValue: uuid, primaryKey: true },
    saleId: { type: DataTypes.UUID, allowNull: false },
    productId: { type: DataTypes.UUID, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    mount: { type: DataTypes.FLOAT, allowNull: false },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
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
    tableName: 'saleDetails',
    timestamps: true,
  },
)

saleDetail.belongsTo(Sale, { foreignKey: 'saleId', as: 'sale' })
Sale.hasMany(saleDetail, { foreignKey: 'saleId', as: 'saleDetails' })

saleDetail.belongsTo(Product, { foreignKey: 'productId', as: 'product' })
Product.hasMany(saleDetail, { foreignKey: 'productId', as: 'saleDetails' })

export default saleDetail
