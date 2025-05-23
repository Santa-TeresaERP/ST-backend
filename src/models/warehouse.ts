import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@config/database'
import { WarehouseAttributes } from '@type/almacen/warehouse'
import { v4 as uuid } from 'uuid'

class Warehouse
  extends Model<WarehouseAttributes, Optional<WarehouseAttributes, 'id'>>
  implements WarehouseAttributes
{
  public id!: string
  public name!: string
  public location!: string
  public capacity!: number
  public observation?: string
}

Warehouse.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: uuid,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    location: { type: DataTypes.STRING, allowNull: false },
    capacity: { type: DataTypes.INTEGER, allowNull: false },
    observation: { type: DataTypes.STRING, allowNull: true },
  },
  {
    sequelize,
    tableName: 'warehouses',
    timestamps: true,
  },
)

export default Warehouse
