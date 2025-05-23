import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@config/database'
import { SuplierAttributes } from '@type/almacen/supplier'
import { v4 as uuid } from 'uuid'

class Supplier
  extends Model<SuplierAttributes, Optional<SuplierAttributes, 'id'>>
  implements SuplierAttributes
{
  public id?: string
  public ruc!: number
  public suplier_name!: string
  public contact_name!: string
  public email!: string
  public phone!: number
  public address!: string
  public createdAt?: Date
  public updatedAt?: Date
}

Supplier.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: uuid,
      primaryKey: true,
    },
    ruc: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    suplier_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contact_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    phone: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
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
    tableName: 'suppliers',
    timestamps: true,
  },
)

export default Supplier
