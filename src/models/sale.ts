import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@config/database'
import { salesAttributes } from '@type/ventas/sale'
import { v4 as uuid } from 'uuid'
import Store from '@models/store'

class sale
  extends Model<salesAttributes, Optional<salesAttributes, 'id'>>
  implements salesAttributes
{
  public id?: string
  public income_date!: string
  public store_id!: string
  public total_income!: number
  public observations?: string
  public createdAt!: Date
  public updatedAt!: Date
}

sale.init(
  {
    id: { type: DataTypes.UUID, defaultValue: uuid, primaryKey: true },
    income_date: { type: DataTypes.STRING, allowNull: false },
    store_id: { type: DataTypes.UUID, allowNull: false },
    total_income: { type: DataTypes.FLOAT, allowNull: false },
    observations: { type: DataTypes.STRING, allowNull: true },
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
    tableName: 'sales',
    timestamps: true,
  },
)

sale.belongsTo(Store, { foreignKey: 'store_id', as: 'store' })
Store.hasMany(sale, { foreignKey: 'store_id', as: 'sales' })

export default sale
