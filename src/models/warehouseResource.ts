import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@config/database'
import { WarehouseResourceAttributes } from '@type/almacen/warehouse_resource'
import Resource from '@models/resource'
import Warehouse from '@models/warehouse'
import { v4 as uuidv4 } from 'uuid'

class WarehouseResource
  extends Model<
    WarehouseResourceAttributes,
    Optional<WarehouseResourceAttributes, 'id'>
  >
  implements WarehouseResourceAttributes
{
  public id?: string
  public warehouse_id!: string
  public resource_id!: string
  public quantity!: number
  public entry_date!: Date
  public readonly createdAt?: Date
  public readonly updatedAt?: Date
}

WarehouseResource.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: uuidv4,
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
