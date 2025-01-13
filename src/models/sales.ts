import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@config/database'
import { salesAttributes } from '@type/sales'
import { v4 as uuid } from 'uuid'
import User from '@models/user'

class sale
  extends Model<salesAttributes, Optional<salesAttributes, 'id'>>
  implements salesAttributes
{
  public id!: string
  public userId!: string
  public total!: number
  public observations!: string
  public createdAt!: Date
  public updatedAt!: Date
}

sale.init(
  {
    id: { type: DataTypes.UUID, defaultValue: uuid, primaryKey: true },
    userId: { type: DataTypes.UUID, allowNull: false },
    total: { type: DataTypes.DECIMAL, allowNull: false },
    observations: { type: DataTypes.STRING, allowNull: true },
    createdAt: { type: DataTypes.DATE, allowNull: false },
    updatedAt: { type: DataTypes.DATE, allowNull: false },
  },
  {
    sequelize,
    tableName: 'sales',
    timestamps: true,
  },
)

sale.belongsTo(User, { foreignKey: 'userId' as 'user' })
User.hasMany(sale, { foreignKey: 'userId' as 'sales' })

export default sale
