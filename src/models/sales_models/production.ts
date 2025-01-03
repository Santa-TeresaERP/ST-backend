import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@config/database'
import { productionAttributes } from '@type/production'
import resource from '@models/sales_models/resource'
//import products from '@models/products'
import { v4 as uuid } from 'uuid'

class production
  extends Model<productionAttributes, Optional<productionAttributes, 'id'>>
  implements productionAttributes
{
  public id!: string
  public productId!: string
  public quantityProduced!: number
  public resourceId!: string
  public quantityUsed!: string
  public productionDate!: string
  public observation!: string
}

production.init(
  {
    id: { type: DataTypes.UUID, defaultValue: uuid, primaryKey: true },
    productId: { type: DataTypes.STRING, allowNull: false },
    quantityProduced: { type: DataTypes.INTEGER, allowNull: false },
    resourceId: { type: DataTypes.STRING, allowNull: false },
    quantityUsed: { type: DataTypes.STRING, allowNull: false },
    productionDate: { type: DataTypes.DATE, allowNull: false },
    observation: { type: DataTypes.STRING, allowNull: true },
  },
  {
    sequelize,
    tableName: 'productions',
    timestamps: true,
  },
)

/** 
production.belongsTo(products, {
  foreignKey: 'productId',
  as: 'product',
})

products.hasMany(production, {
  foreignKey: 'productId',
  as: 'productions',
})
*/

production.belongsTo(resource, {
  foreignKey: 'resourceId',
  as: 'resource',
})

resource.hasMany(production, {
  foreignKey: 'resourceId',
  as: 'productions',
})

export default production
