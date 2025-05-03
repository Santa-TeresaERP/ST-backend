// @models/recipeProductResource.ts
import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@config/database'
import { RecipeProductResourceAttributes } from '@type/production/recipe_product_resourse'
import Resource from '@models/resource'
import Product from '@models/product'

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
  public resource_id?: string
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
    resource_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: Resource, // Referencia al modelo directamente
        key: 'resource_id', // Usar el nombre correcto de la PK
      },
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

// Relaciones
RecipeProductResource.belongsTo(Resource, {
  foreignKey: 'resource_id',
  as: 'resource',
})

Resource.hasMany(RecipeProductResource, {
  foreignKey: 'resource_id',
  as: 'recipeProductResources',
})

RecipeProductResource.belongsTo(Product, {
  foreignKey: 'product_id',
  as: 'product',
})

export default RecipeProductResource
