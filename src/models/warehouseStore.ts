import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@config/database'
import { warehouseStoreAttributes } from '@type/ventas/warehouseStore'
import { v4 as uuid } from 'uuid'
import Store from '@models/store'
import Product from '@models/product'

class WarehouseStore
  extends Model<
    warehouseStoreAttributes,
    Optional<warehouseStoreAttributes, 'id' | 'createdAt' | 'updatedAt'>
  >
  implements warehouseStoreAttributes
{
  public id!: string
  public storeId!: string
  public productId!: string
  public quantity!: number
  public createdAt?: Date
  public updatedAt?: Date
}

WarehouseStore.init(
  {
    id: { type: DataTypes.UUID, defaultValue: uuid, primaryKey: true },
    storeId: { type: DataTypes.UUID, allowNull: false },
    productId: { type: DataTypes.UUID, allowNull: false },
    quantity: { type: DataTypes.FLOAT, allowNull: false },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
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
    tableName: 'warehouse_stores',
    timestamps: true,
  },
)

WarehouseStore.belongsTo(Store, { foreignKey: 'storeId', as: 'store' })
Store.hasMany(WarehouseStore, { foreignKey: 'storeId', as: 'warehouseStores' })
WarehouseStore.belongsTo(Product, { foreignKey: 'productId', as: 'product' })
Product.hasMany(WarehouseStore, {
  foreignKey: 'productId',
  as: 'warehouseStores',
})

export default WarehouseStore
