import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@config/database'
import { CategoryAttributes } from '@type/modules'
import { v4 as uuid } from 'uuid'

class Category
  extends Model<CategoryAttributes, Optional<CategoryAttributes, 'id'>>
  implements CategoryAttributes
{
  public id!: string
  public name!: string
  public description!: string
}

Category.init(
  {
    id: { type: DataTypes.UUID, defaultValue: uuid, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: true },
  },
  {
    sequelize,
    tableName: 'categories',
    timestamps: true,
  },
)

export default Category
