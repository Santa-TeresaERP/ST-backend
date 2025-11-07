import { DataTypes, Model, Optional } from 'sequelize'
import { v4 as uuid } from 'uuid'
import sequelize from '@config/database'
import { CategoryAttributes } from '@type/production/categories'

class Category
  extends Model<
    CategoryAttributes,
    Optional<CategoryAttributes, 'id' | 'status'>
  >
  implements CategoryAttributes
{
  public id!: string
  public name!: string
  public description!: string
  public readonly createdAt!: Date // Agregado para timestamps
  public readonly updatedAt!: Date // Agregado para timestamps
  public status!: boolean // Agregado para el estado de la categoría
}

Category.init(
  {
    id: { type: DataTypes.UUID, defaultValue: uuid, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: true },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    status: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true }, // Agregado para el estado de la categoría
  },
  {
    sequelize,
    tableName: 'categories',
    timestamps: true, // Esto asegura que Sequelize maneje createdAt y updatedAt automáticamente
  },
)

export default Category
