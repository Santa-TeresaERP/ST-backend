import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@config/database'
import { WarehouseProductAttributes } from '@type/almacen/warehouse_product'
import { v4 as uuid } from 'uuid'
import Product from '@models/product'
import Warehouse from '@models/warehouse'

class WarehouseProduct
  extends Model<
    WarehouseProductAttributes,
    Optional<WarehouseProductAttributes, 'id'>
  >
  implements WarehouseProductAttributes
{
  public id?: string
  public warehouse_id!: string
  public product_id!: string
  public quantity!: number
  public entry_date!: Date
  public createdAt?: Date
  public updatedAt?: Date
}

WarehouseProduct.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: uuid,
      primaryKey: true,
    },
    warehouse_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    entry_date: {
      type: DataTypes.DATE,
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
    tableName: 'warehouse_products',
    timestamps: true,
  },
)

WarehouseProduct.belongsTo(Warehouse, {
  foreignKey: 'warehouse_id',
  as: 'warehouse',
})

Warehouse.hasMany(WarehouseProduct, {
  foreignKey: 'warehouse_id',
  as: 'warehouse_products',
})

WarehouseProduct.belongsTo(Product, {
  foreignKey: 'product_id',
  as: 'product',
})

Product.hasMany(WarehouseProduct, {
  foreignKey: 'product_id',
  as: 'warehouse_products',
})

export default WarehouseProduct
