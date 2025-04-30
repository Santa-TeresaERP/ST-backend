import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@config/database'
import { CashSessionAttributes } from '@type/ventas/cashSession'
import { v4 as uuid } from 'uuid'

// Definimos los atributos opcionales (en este caso solo el ID)
class CashSession
  extends Model<CashSessionAttributes, Optional<CashSessionAttributes, 'id'>>
  implements CashSessionAttributes
{
  public id!: string
  public user_id!: number
  public store_id!: number
  public start_amount!: number
  public end_amount!: number
  public total_returns!: number
  public ended_at!: Date

  // timestamps automáticos si los necesitas (createdAt, updatedAt)
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
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    store_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    start_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    end_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    total_returns: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    ended_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'cash_sessions',
    timestamps: true, // Esto crea automáticamente createdAt y updatedAt
  },
)

export default CashSession
