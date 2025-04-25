import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@config/database'
import { WarehouseProductAttributes } from '@type/almacen/warehouse_product'
import { v4 as uuid } from 'uuid'

class WarehouseProduct
  extends Model<
    WarehouseProductAttributes,
    Optional<WarehouseProductAttributes, 'warehouse_product_id'>
  >
  implements WarehouseProductAttributes
{
  public warehouse_product_id!: string
  public warehouse_id!: string
  public product_id!: string
  public quantity!: number
  public entry_date!: Date
  public createdAt?: Date
  public updatedAt?: Date
}

WarehouseProduct.init(
  {
    warehouse_product_id: {
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

export default WarehouseProduct
