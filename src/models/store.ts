import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@config/database'
import { store as StoreAttributes } from '@type/ventas/store'
import { v4 as uuid } from 'uuid'

class Store
  extends Model<StoreAttributes, Optional<StoreAttributes, 'id'>>
  implements StoreAttributes
{
  public id?: string
  public store_name!: string
  public address!: string
  public observations?: string
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Store.init(
  {
    id: { type: DataTypes.UUID, defaultValue: uuid, primaryKey: true },
    store_name: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.STRING, allowNull: false },
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
    tableName: 'stores',
    timestamps: true,
  },
)

export default Store
