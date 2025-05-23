import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@config/database'
import { WarehouseMovomentResourceAttributes } from '@type/almacen/warehouse_movoment_resource'
import { v4 as uuid } from 'uuid'

class WarehouseMovementResource
  extends Model<
    WarehouseMovomentResourceAttributes,
    Optional<WarehouseMovomentResourceAttributes, 'id'>
  >
  implements WarehouseMovomentResourceAttributes
{
  public id!: string
  public warehouse_id!: string
  public resource_id!: string
  public type!: string
  public movement_type!: string
  public quantity!: number
  public movement_date!: Date
  public observations?: string
}

WarehouseMovementResource.init(
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
    resource_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
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
    tableName: 'warehouse_movement_resources',
    timestamps: true,
  },
)

export default WarehouseMovementResource
