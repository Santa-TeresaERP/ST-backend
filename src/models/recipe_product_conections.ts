import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@config/database'
import { RecipeProductConectionAttributes } from '@type/production/recipe_product_conections'

class RecipeProductConection
  extends Model<
    RecipeProductConectionAttributes,
    Optional<RecipeProductConectionAttributes, never> // no hay atributos opcionales
  >
  implements RecipeProductConectionAttributes
{
  public recipe_id!: string
  public resource_id!: number
}

RecipeProductConection.init(
  {
    recipe_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    resource_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'resources',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: 'recipe_product_resources',
    timestamps: false, // activa si quieres createdAt/updatedAt
  },
)

export default RecipeProductConection
