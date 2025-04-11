import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@config/database'
import { lostAttributes } from '@type/lost'
import { v4 as uuid } from 'uuid'
import Product from '@models/product'

class Lost
  extends Model<lostAttributes, Optional<lostAttributes, 'lost_id'>>
  implements lostAttributes
{
  public lost_id!: string
  public product_id!: string
  public quantity!: number
  public lost_type!: string
  public observations!: string
  public created_at!: Date
}

Lost.init(
  {
    lost_id: {
      type: DataTypes.UUID,
      defaultValue: uuid,
      primaryKey: true,
    },
    product_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'products',
        key: 'product_id',
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    lost_type: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    observations: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'losts',
    timestamps: false, // Ya estás usando created_at manualmente
  }
)

// Relaciones
Lost.belongsTo(Product, { foreignKey: 'product_id' })
Product.hasMany(Lost, { foreignKey: 'product_id' })

export default Lost
