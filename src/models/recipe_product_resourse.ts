// @models/recipeProductResource.ts
import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@config/database'
import { RecipeProductResourceAttributes } from '@type/production/recipe_product_resourse'
import Resource from '@models/resource'
import Product from './product'
import RecipeProductConection from './recipe_product_conections'

class RecipeProductResource
  extends Model<
    RecipeProductResourceAttributes,
    Optional<RecipeProductResourceAttributes, never>
  >
  implements RecipeProductResourceAttributes
{
  public id!: string
  public product_id!: string
  public quantity_required!: string
  public unit!: string
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

RecipeProductResource.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    product_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    quantity_required: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    unit: {
      type: DataTypes.STRING,
      allowNull: false,
    },
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
    tableName: 'recipe_product_resources',
    timestamps: true,
  },
)

RecipeProductConection.belongsTo(RecipeProductResource, {
  foreignKey: 'product_id',
})
RecipeProductConection.belongsTo(Resource, { foreignKey: 'resource_id' })

RecipeProductResource.belongsToMany(Product, {
  through: RecipeProductConection,
  foreignKey: 'product_id',
  as: 'product',
})

RecipeProductResource.belongsToMany(Resource, {
  through: RecipeProductConection,
  foreignKey: 'resource_id',
  as: 'resource',
})

export default RecipeProductResource
