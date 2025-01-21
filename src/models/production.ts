import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@config/database'
import { productionAttributes } from '@type/production'
import products from '@models/product'
import { v4 as uuid } from 'uuid'

class production
  extends Model<productionAttributes, Optional<productionAttributes, 'id'>>
  implements productionAttributes
{
  public id!: string
  public productId!: string
  public quantityProduced!: number
  public quantityUsed!: string
  public productionDate!: string
  public observation!: string
}

production.init(
  {
    id: { type: DataTypes.UUID, defaultValue: uuid, primaryKey: true },
    productId: { type: DataTypes.UUID, allowNull: false },
    quantityProduced: { type: DataTypes.INTEGER, allowNull: false },
    quantityUsed: { type: DataTypes.STRING, allowNull: false },
    productionDate: { type: DataTypes.DATE, allowNull: false },
    observation: { type: DataTypes.STRING, allowNull: true },
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
    tableName: 'productions',
    timestamps: true,
  },
)

production.belongsTo(products, {
  foreignKey: 'productId',
  as: 'product',
})

products.hasMany(production, {
  foreignKey: 'productId',
  as: 'productions',
})

export default production
