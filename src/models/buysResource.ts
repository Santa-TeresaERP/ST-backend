import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@config/database'
import { buysResourceAttributes } from '@type/almacen/buys_resource'
import Resource from '@models/resource'
import Warehouse from '@models/warehouse'
import Supplier from '@models/suplier'
import { v4 as uuidv4 } from 'uuid'

class BuysResource
  extends Model<buysResourceAttributes, Optional<buysResourceAttributes, 'id'>>
  implements buysResourceAttributes
{
  static async findById(id: string): Promise<BuysResource | null> {
    return await BuysResource.findOne({ where: { id } })
  }
  public id?: string
  public warehouse_id!: string
  public resource_id!: string
  public type_unit!: string
  public unit_price!: number
  public total_cost!: number
  public supplier_id!: string
  public quantity!: number
  public entry_date!: Date
}

BuysResource.init(
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
    type_unit: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    unit_price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    total_cost: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    supplier_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    entry_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'warehouse_resources',
    timestamps: true,
  },
)

BuysResource.belongsTo(Resource, {
  foreignKey: 'resource_id',
  as: 'resource',
})
Resource.hasMany(BuysResource, {
  foreignKey: 'resource_id',
  as: 'warehouse_resources',
})
BuysResource.belongsTo(Warehouse, {
  foreignKey: 'warehouse_id',
  as: 'warehouse',
})
Warehouse.hasMany(BuysResource, {
  foreignKey: 'warehouse_id',
  as: 'warehouse_resources',
})

BuysResource.belongsTo(Supplier, {
  foreignKey: 'supplier_id',
  as: 'supplier',
})

Supplier.hasMany(BuysResource, {
  foreignKey: 'supplier_id',
  as: 'warehouse_resources',
})

export default BuysResource
