import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@config/database'
import { WarehouseMovomentProductAttributes } from '@type/almacen/warehouse_movement_product'
import { v4 as uuid } from 'uuid'

class WarehouseMovementProduct
  extends Model<
    WarehouseMovomentProductAttributes,
    Optional<WarehouseMovomentProductAttributes, 'movement_id'>
  >
  implements WarehouseMovomentProductAttributes
{
  public movement_id!: string
  public warehouse_id!: string
  public store_id!: string
  public product_id!: string
  public movement_type!: string
  public quantity!: number
  public movement_date!: Date
  public observations?: string
  public createdAt?: Date
  public updatedAt?: Date
}

WarehouseMovementProduct.init(
  {
    movement_id: {
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
    tableName: 'warehouse_movement_products',
    timestamps: true,
  },
)

export default WarehouseMovementProduct
