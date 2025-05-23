import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@config/database'
import { ResourceAttributes } from '@type/almacen/resource'
import { v4 as uuid } from 'uuid'
import Supplier from '@models/suplier'

class Resource
  extends Model<ResourceAttributes, Optional<ResourceAttributes, 'id'>>
  implements ResourceAttributes
{
  public id?: string
  public name!: string
  public unit_price!: string
  public type_unit!: string
  public total_cost!: number
  public supplier_id?: string
  public observation?: string
  public purchase_date!: Date
  public createdAt?: Date
  public updatedAt?: Date
}

Resource.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: uuid,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    unit_price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type_unit: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'unidades',
    },
    total_cost: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    supplier_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    observation: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    purchase_date: {
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
