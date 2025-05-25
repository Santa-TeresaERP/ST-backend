import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@config/database'
import { WarehouseMovomentResourceAttributes } from '@type/almacen/warehouse_movoment_resource'
import { v4 as uuid } from 'uuid'
import Warehouse from '@models/warehouse'
import Resource from '@models/resource'

class WarehouseMovementResource
  extends Model<
    WarehouseMovomentResourceAttributes,
    Optional<WarehouseMovomentResourceAttributes, 'movement_id'>
  >
  implements WarehouseMovomentResourceAttributes
{
  public movement_id!: string
  public warehouse_id!: string
  public resource_id!: string
  public movement_type!: string
  public quantity!: number
  public movement_date!: Date
  public observations?: string
  public createdAt?: Date
  public updatedAt?: Date
}

WarehouseMovementResource.init(
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
    resource_id: {
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
    tableName: 'warehouse_movement_resources',
    timestamps: true,
  },
)

WarehouseMovementResource.belongsTo(Warehouse, {
  foreignKey: 'warehouse_id',
  as: 'warehouse',
})

Warehouse.hasMany(WarehouseMovementResource, {
  foreignKey: 'warehouse_id',
  as: 'warehouse_movement_resources',
})

WarehouseMovementResource.belongsTo(Resource, {
  foreignKey: 'product_id',
  as: 'product',
})

Resource.hasMany(WarehouseMovementResource, {
  foreignKey: 'product_id',
  as: 'warehouse_movement_resources',
})

export default WarehouseMovementResource
