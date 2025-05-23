import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@config/database'
import { WarehouseMovomentProductAttributes } from '@type/almacen/warehouse_movement_product'
import { v4 as uuid } from 'uuid'

class WarehouseMovementProduct
  extends Model<
    WarehouseMovomentProductAttributes,
    Optional<WarehouseMovomentProductAttributes, 'id'>
  >
  implements WarehouseMovomentProductAttributes
{
  public id!: string
  public warehouse_id!: string
  public store_id!: string
  public product_id!: string
  public movement_type!: string
  public quantity!: number
  public movement_date!: Date
  public observations?: string
}

WarehouseMovementProduct.init(
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
    store_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    movement_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    movement_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    observations: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'warehouse_movement_products',
    timestamps: true,
  },
)

export default WarehouseMovementProduct
