import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@config/database'
import Product from '@models/products'
import { v4 as uuid } from 'uuid'

interface InventoryAdjustmentAttributes {
  id: string
  product_id: string
  adjustment_type: string
  quantity: number
  observations: string | null
  created_at: Date
}

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
  public observations!: string | null
  public created_at!: Date
}

InventoryAdjustment.init(
  {
    id: { type: DataTypes.UUID, defaultValue: uuid, primaryKey: true },
    product_id: { type: DataTypes.UUID, allowNull: false },
    adjustment_type: { type: DataTypes.STRING, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    observations: { type: DataTypes.STRING, allowNull: true },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'inventory_adjustments',
    timestamps: false,
  },
)

// Relaciones
InventoryAdjustment.belongsTo(Product, { foreignKey: 'product_id' })

export default InventoryAdjustment
