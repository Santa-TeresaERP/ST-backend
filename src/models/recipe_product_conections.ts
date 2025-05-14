import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@config/database'
import { RecipeProductConectionAttributes } from '@type/production/recipe_product_conections'
import RecipeProductResource from '@models/recipe_product_resourse'
import Resource from '@models/resource'

class RecipeProductConection
  extends Model<
    RecipeProductConectionAttributes,
    Optional<RecipeProductConectionAttributes, never> // no hay atributos opcionales
  >
  implements RecipeProductConectionAttributes
{
  public recipe_id!: string
  public resource_id!: string
}

RecipeProductConection.init(
  {
    recipe_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    resource_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'recipe_product_conexions',
    timestamps: false, // activa si quieres createdAt/updatedAt
  },
)

RecipeProductConection.belongsTo(RecipeProductResource, {
  foreignKey: 'recipe_id', // Define la clave foránea
  as: 'recipe', // Alias para la relación
})

RecipeProductResource.hasMany(RecipeProductConection, {
  foreignKey: 'recipe_id', // Define la clave foránea en la tabla pivote
  as: 'recipe_product_conections', // Alias para la relación
})

RecipeProductResource.belongsToMany(Resource, {
  through: RecipeProductConection,
  foreignKey: 'resource_id',
  as: 'resource',
})

Resource.belongsToMany(RecipeProductResource, {
  through: RecipeProductConection,
  foreignKey: 'resource_id',
  as: 'recipe_product_resources',
})

export default RecipeProductConection
