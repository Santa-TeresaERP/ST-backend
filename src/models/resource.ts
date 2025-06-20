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
  public observation?: string
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
    observation: {
      type: DataTypes.STRING,
      allowNull: true,
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
