import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@config/database'
import { lostAttributes } from '@type/production/lost'
import { v4 as uuid } from 'uuid'
import Product from '@models/product'

class Lost
  extends Model<lostAttributes, Optional<lostAttributes, 'id'>>
  implements lostAttributes
{
  public id!: string
  public product_id!: string
  public quantity!: number
  public lost_type!: string
  public observations!: string
  public created_at!: Date
}

Lost.init(
  {
    id: { type: DataTypes.UUID, defaultValue: uuid, primaryKey: true },
    product_id: { type: DataTypes.UUID, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    lost_type: { type: DataTypes.STRING, allowNull: false },
    observations: { type: DataTypes.STRING, allowNull: true },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'lost',
    tableName: 'lost',
    timestamps: true,
  },
)

// Relaciones
Lost.belongsTo(Product, { foreignKey: 'product_id' })
Product.hasMany(Lost, { foreignKey: 'product_id' })

export default Lost
