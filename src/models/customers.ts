import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@config/database'
import { CustomerAttributes } from '@type/alquiler/customers'
import { v4 as uuid } from 'uuid'

class Customer
  extends Model<CustomerAttributes, Optional<CustomerAttributes, 'id'>>
  implements CustomerAttributes
{
  public id!: string
  public full_name!: string
  public dni!: number
  public phone!: string
  public email!: string
}

Customer.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: uuid,
      primaryKey: true,
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dni: {
      type: DataTypes.INTEGER, // <- porque en la interfaz es `number`
      unique: true,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
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
    tableName: 'customers',
    timestamps: true,
  },
)

export default Customer
