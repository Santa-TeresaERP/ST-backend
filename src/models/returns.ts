import { DataTypes, Model, Optional } from 'sequelize'
import { returnsAttributes } from '@type/returns'
import sequelize from '../config/database'
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
}

Return.init(
  {
    id: { type: DataTypes.UUID, defaultValue: uuid, primaryKey: true },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'product_id',
      references: { model: 'products', key: 'id' },
    },
    salesId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'sales_id',
      references: { model: 'sales', key: 'id' },
    },
    reason: { type: DataTypes.STRING, allowNull: true },
    observations: { type: DataTypes.STRING, allowNull: true },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: 'created_at',
    },
  },
  {
    sequelize,
    tableName: 'returns',
    timestamps: true,
  },
)

export default Return
