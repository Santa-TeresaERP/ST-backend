import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@config/database'
import { InventoryAdjustmentAttributes } from '@type/inventoryAdjustment'
import Product from '@models/products'
import { v4 as uuid } from 'uuid'

class InventoryAdjustment
  extends Model<
    InventoryAdjustmentAttributes,
    Optional<InventoryAdjustmentAttributes, 'id'>
  >
  implements InventoryAdjustmentAttributes
{
  public id!: string
  public product_id!: string
  public adjustment_type!: string
  public quantity!: number
  public observations!: string
  public created_at!: Date
}

InventoryAdjustment.init(
  {
    id: { type: DataTypes.UUID, defaultValue: uuid, primaryKey: true },
    product_id: { type: DataTypes.UUID, allowNull: false },
    adjustment_type: { type: DataTypes.STRING, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    observations: { type: DataTypes.STRING, allowNull: true },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'inventory_adjustments',
    timestamps: true,
  },
)

// Relationships
InventoryAdjustment.belongsTo(Product, {
  foreignKey: 'product_id',
  as: 'product',
})

Product.hasMany(InventoryAdjustment, {
  foreignKey: 'product_id',
  as: 'inventoryAdjustments',
})

export default InventoryAdjustment
