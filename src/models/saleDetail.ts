import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@config/database'
import { SaleDetailAttributes } from '@type/saleDetail'
import { v4 as uuid } from 'uuid'

class saleDetail
  extends Model<SaleDetailAttributes, Optional<SaleDetailAttributes, 'id'>>
  implements SaleDetailAttributes
{
  public id!: string
  public productId!: string
  public quantity!: number
  public createdAt!: Date
  public updatedAt!: Date
}

saleDetail.init(
  {
    id: { type: DataTypes.UUID, defaultValue: uuid, primaryKey: true },
    productId: { type: DataTypes.STRING, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
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

export default saleDetail
