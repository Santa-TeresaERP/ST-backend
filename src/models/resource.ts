import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@config/database'
import { ResourceAttributes } from '@type/almacen/resource'
import { v4 as uuid } from 'uuid'
import Supplier from '@models/suplier'

class Resource
  extends Model<ResourceAttributes, Optional<ResourceAttributes, 'resource_id'>>
  implements ResourceAttributes
{
  public resource_id!: string
  public name!: string
  public entry_quantity!: number
  public total_cost!: number
  public type_unit!: string
  public supplier_id?: string
  public purchase_date!: Date
  public observation?: string
  public createdAt?: Date
  public updatedAt?: Date
}

Resource.init(
  {
    resource_id: {
      type: DataTypes.UUID,
      defaultValue: uuid,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    entry_quantity: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    total_cost: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    type_unit: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    supplier_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    purchase_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    observation: {
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
    tableName: 'resources',
    timestamps: true,
  },
)

Resource.belongsTo(Supplier, {
  foreignKey: 'supplier_id',
  as: 'supplier',
})
Supplier.hasMany(Resource, {
  foreignKey: 'supplier_id',
  as: 'resources',
})

export default Resource
