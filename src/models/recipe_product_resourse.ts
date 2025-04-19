// @models/recipeProductResource.ts
import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@config/database'
import { RecipeProductResourceAttributes } from '@type/recipe_product_resourse'

class RecipeProductResource
  extends Model<RecipeProductResourceAttributes, Optional<RecipeProductResourceAttributes, never>>
  implements RecipeProductResourceAttributes
{
  public recipe_id!: string
  public product_id!: string
  public quantity_required!: string
  public unit!: string
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

RecipeProductResource.init(
  {
    recipe_id: {
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
