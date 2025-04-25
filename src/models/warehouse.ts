import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@config/database'
import { WarehouseAttributes } from '@type/almacen/warehouse'
import { v4 as uuid } from 'uuid'

class Warehouse
  extends Model<
    WarehouseAttributes,
    Optional<WarehouseAttributes, 'warehouse_id'>
  >
  implements WarehouseAttributes
{
  public warehouse_id!: string
  public name!: string
  public location!: string
  public capacity!: number
  public observation!: string
  public createdAt!: Date
  public updatedAt!: Date
}

Warehouse.init(
  {
    warehouse_id: {
      type: DataTypes.UUID,
      defaultValue: uuid,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    location: { type: DataTypes.STRING, allowNull: false },
    capacity: { type: DataTypes.INTEGER, allowNull: false },
    observation: { type: DataTypes.STRING, allowNull: true },
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
    tableName: 'warehouses',
    timestamps: true,
  },
)

export default Warehouse
