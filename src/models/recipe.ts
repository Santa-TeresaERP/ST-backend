import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@config/database'
import { recipeAttributes } from '@type/production/recipes'
import { v4 as uuid } from 'uuid'
import Product from '@models/product'
import Resource from '@models/resource'

class Recipe
  extends Model<recipeAttributes, Optional<recipeAttributes, 'id'>>
  implements recipeAttributes
{
  public id!: string
  public productId!: string
  public resourceId!: string
  public quantity!: number
  public unit!: string
  public createdAt?: Date
  public updatedAt?: Date
}

Recipe.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: uuid,
      primaryKey: true,
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    resourceId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    unit: {
      type: DataTypes.ENUM('g', 'kg', 'ml', 'l', 'unidades'),
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
    tableName: 'recipes',
    timestamps: true,
  },
)

Recipe.belongsTo(Product, {
  foreignKey: 'productId',
  as: 'product',
})

Recipe.belongsTo(Resource, {
  foreignKey: 'resourceId',
  as: 'resource',
})

Product.hasMany(Recipe, {
  foreignKey: 'productId',
  as: 'recipe', // Nota: en singular
})

Resource.hasMany(Recipe, {
  foreignKey: 'resourceId',
  as: 'recipes',
})

export default Recipe
