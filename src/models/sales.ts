import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@config/database'
import { salesAtributes } from '@type/sales'
import { v4 as uuid } from 'uuid'
import User from '@models/user'
import SaleItem from './salesItems'

class Sale 
  extends Model<salesAtributes, Optional<salesAtributes, 'id'>>
  implements salesAtributes {
  public id!: string
  public userId!: string
  public total!: number
  public observations!: string | null
  public createdAt!: Date
}

Sale.init(
  {
    id: { type: DataTypes.UUID, defaultValue: uuid, primaryKey: true },
    userId: { type: DataTypes.UUID, allowNull: false },
    total: { type: DataTypes.DECIMAL, allowNull: false },
    observations: { type: DataTypes.STRING, allowNull: true },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  },
  {
    sequelize,
    tableName: 'sales',
    timestamps: true,
  }
)
Sale.belongsTo(User, { foreignKey: 'user_id' })
Sale.hasMany(SaleItem, { foreignKey: 'salesId' })

export default Sale
