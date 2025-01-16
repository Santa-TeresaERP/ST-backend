import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@config/database'
import { WarehouseAttributes } from '@type/warehouse'
import Product from '@models/products'
import InventoryAdjustment from '@models/inventoryAdjustment'
import { v4 as uuid } from 'uuid'

class Warehouse
  extends Model<WarehouseAttributes, Optional<WarehouseAttributes, 'id'>>
  implements WarehouseAttributes
{
  public id!: string
  public product_id!: string
  public quantity!: number
  public inventory_adjustment_id!: string
  public observations!: string
  public created_at!: string
}

Warehouse.init(
  {
    id: { type: DataTypes.UUID, defaultValue: uuid, primaryKey: true },
    product_id: { type: DataTypes.UUID, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    inventory_adjustment_id: { type: DataTypes.UUID, allowNull: true },
    observations: { type: DataTypes.STRING, allowNull: true },
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

// Relationships
Warehouse.belongsTo(Product, { foreignKey: 'product_id', as: 'product' })
Product.hasMany(Warehouse, { foreignKey: 'product_id', as: 'warehouses' })

Warehouse.belongsTo(InventoryAdjustment, {
  foreignKey: 'inventory_adjustment_id',
  as: 'adjustment',
})

export default Warehouse
