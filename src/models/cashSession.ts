import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@config/database'
import { CashSessionAttributes } from '@type/ventas/cashSession'
import { v4 as uuid } from 'uuid'

class CashSession
  extends Model<CashSessionAttributes, Optional<CashSessionAttributes, 'id'>>
  implements CashSessionAttributes
{
  public id!: string
  public user_id!: string
  public store_id!: string
  public start_amount!: number
  public end_amount?: number
  public total_sales?: number
  public total_returns?: number
  public started_at!: Date
  public ended_at?: Date
  public status!: 'open' | 'closed'

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

CashSession.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuid(),
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    store_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    start_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    end_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    total_sales: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    total_returns: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    started_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    ended_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('open', 'closed'),
      allowNull: false,
      defaultValue: 'open',
    },
  },
  {
    sequelize,
    tableName: 'cash_sessions',
    timestamps: true,
  },
)

export default CashSession
