import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@config/database'
import { store as StoreAttributes } from '@type/store'
import { v4 as uuid } from 'uuid'

class Store
  extends Model<StoreAttributes, Optional<StoreAttributes, 'id'>>
  implements StoreAttributes
{
  public id!: string
  public store_name!: string
  public address!: string
  public observations?: string

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Store.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuid(),
      primaryKey: true,
    },
    store_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    observations: {
      type: DataTypes.STRING(300),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'stores',
    timestamps: true,
  },
)

export default Store
