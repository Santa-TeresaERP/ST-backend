import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@config/database'
import { WarehouseResourceAttributes } from '@type/almacen/warehouse_resource'
import Resource from '@models/resource'
import Warehouse from '@models/warehouse'
import { v4 as uuidv4 } from 'uuid'

class WarehouseResource
  extends Model<
    WarehouseResourceAttributes,
    Optional<WarehouseResourceAttributes, 'warehouse_resource_id'>
  >
  implements WarehouseResourceAttributes
{
  public warehouse_resource_id!: string
  public warehouse_id!: string
  public resource_id!: number
  public quantity!: number
  public entry_date!: Date
  public readonly createdAt?: Date
  public readonly updatedAt?: Date
}

WarehouseResource.init(
  {
    warehouse_resource_id: {
      type: DataTypes.UUID,
      defaultValue: uuidv4,
      primaryKey: true,
    },
    warehouse_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    resource_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    entry_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
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
    tableName: 'warehouse_resources',
    timestamps: true,
  },
)

WarehouseResource.belongsTo(Resource, {
  foreignKey: 'resource_id',
  as: 'resource',
})
Resource.hasMany(WarehouseResource, {
  foreignKey: 'resource_id',
  as: 'warehouse_resources',
})
WarehouseResource.belongsTo(Warehouse, {
  foreignKey: 'warehouse_id',
  as: 'warehouse',
})
Warehouse.hasMany(WarehouseResource, {
  foreignKey: 'warehouse_id',
  as: 'warehouse_resources',
})

export default WarehouseResource
