import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@config/database'
import { productionAttributes } from '@type/production'
import { v4 as uuid } from 'uuid'
import Product from '@models/product'
import PlantProduction from '@models/plant_production'

class Production
  extends Model<productionAttributes, Optional<productionAttributes, 'production_id'>> 
  implements productionAttributes
{
  public production_id!: string
  public productId!: string
  public quantityProduced!: number
  public productionDate!: string
  public observation!: string
  public plant_id!: string
  public createdAt?: Date
  public updatedAt?: Date
}

Production.init(
  {
    production_id: {
      type: DataTypes.UUID,
      defaultValue: uuid,
      primaryKey: true,
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    quantityProduced: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productionDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    observation: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    plant_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'production',
    timestamps: true,
  },
)

// Relaciones
Production.belongsTo(Product, { foreignKey: 'productId' })
Product.hasMany(Production, { foreignKey: 'productId' })

Production.belongsTo(PlantProduction, { foreignKey: 'plant_id' })
PlantProduction.hasMany(Production, { foreignKey: 'plant_id' })

export default Production
