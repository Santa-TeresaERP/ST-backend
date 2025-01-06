import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@config/database'
import Product from '@models/products'
import InventoryAdjustment from '@models/inventoryAdjustment'
import { v4 as uuid } from 'uuid'

interface WarehouseAttributes {
  id: string
  product_id: string
  quantity: number
  inventory_adjustment_id: string | null
  observations: string | null
  created_at: Date
}

class Warehouse
  extends Model<WarehouseAttributes, Optional<WarehouseAttributes, 'id'>>
  implements WarehouseAttributes
{
  public id!: string
  public product_id!: string
  public quantity!: number
  public inventory_adjustment_id!: string | null
  public observations!: string | null
  public created_at!: Date
}

Warehouse.init(
  {
    id: { type: DataTypes.UUID, defaultValue: uuid, primaryKey: true },
    product_id: { type: DataTypes.UUID, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    inventory_adjustment_id: { type: DataTypes.STRING, allowNull: true },
    observations: { type: DataTypes.STRING, allowNull: true },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'warehouses',
    timestamps: false,
  },
)

// Relaciones
Warehouse.belongsTo(Product, { foreignKey: 'product_id' })
Warehouse.belongsTo(InventoryAdjustment, {
  foreignKey: 'inventory_adjustment_id',
  as: 'adjustment',
})

export default Warehouse
