import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@config/database'
import { RecipeProductConectionAttributes } from '@type/production/recipe_product_conections'
import RecipeProductResource from '@models/recipe_product_resource'
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
    recipe_id: { type: DataTypes.UUID, allowNull: false, primaryKey: true },
    resource_id: { type: DataTypes.UUID, allowNull: false, primaryKey: true },
  },
  {
    sequelize,
    tableName: 'recipe_product_conexions',
    timestamps: true, // activa si quieres createdAt/updatedAt
  },
)

RecipeProductConection.belongsTo(RecipeProductResource, {
  foreignKey: 'recipe_id',
  as: 'recipe',
})

RecipeProductConection.belongsTo(Resource, {
  foreignKey: 'resource_id',
  as: 'resource',
})

RecipeProductResource.hasMany(RecipeProductConection, {
  foreignKey: 'recipe_id',
  as: 'recipe_product_conections',
})

Resource.hasMany(RecipeProductConection, {
  foreignKey: 'resource_id',
  as: 'recipe_product_conections',
})

RecipeProductResource.belongsToMany(Resource, {
  through: RecipeProductConection,
  foreignKey: 'recipe_id',
  otherKey: 'resource_id',
  as: 'resources',
})

Resource.belongsToMany(RecipeProductResource, {
  through: RecipeProductConection,
  foreignKey: 'resource_id',
  otherKey: 'recipe_id',
  as: 'recipe_product_resources',
})
export default RecipeProductConection
