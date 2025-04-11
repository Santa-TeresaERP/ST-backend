import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@config/database'
import { RecipeProductResourceAttributes } from '@type/recipe_product_conections'
import Resource from '@models/resource'
import Recipe from '@models/recipe_product_conections'

class RecipeProductResource
  extends Model<
    RecipeProductResourceAttributes,
    Optional<RecipeProductResourceAttributes, never> // no hay atributos opcionales
  >
  implements RecipeProductResourceAttributes
{
  public recipe_id!: string
  public resource_id!: number
}

RecipeProductResource.init(
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
  }
)

// Relaciones (asumiendo los modelos existen y están bien nombrados)
RecipeProductResource.belongsTo(Resource, { foreignKey: 'resource_id' })
Resource.hasMany(RecipeProductResource, { foreignKey: 'resource_id' })

RecipeProductResource.belongsTo(Recipe, { foreignKey: 'recipe_id' })
Recipe.hasMany(RecipeProductResource, { foreignKey: 'recipe_id' })

export default RecipeProductResource
