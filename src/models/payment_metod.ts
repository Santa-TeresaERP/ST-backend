import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@config/database'
import { paymentMethodAttributes } from '@type/museo/payment_metod'
import { v4 as uuid } from 'uuid'

class PaymentMethod
  extends Model<
    paymentMethodAttributes,
    Optional<paymentMethodAttributes, 'id'>
  >
  implements paymentMethodAttributes
{
  public id!: string
  public name!: string
}

PaymentMethod.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: uuid,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'payment_methods',
    timestamps: true,
  },
)

export default PaymentMethod
