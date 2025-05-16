import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@config/database'
import { ProductAttributes } from '@type/production/products'
import { v4 as uuid } from 'uuid'
import Category from '@models/categories'

class Product
  extends Model<ProductAttributes, Optional<ProductAttributes, 'id'>>
  implements ProductAttributes
{
  public id!: string
  public name!: string
  public category_id!: string
  public price!: number
  public description!: string
  public imagen_url?: string
  public createdAt?: Date
  public updatedAt?: Date
}

Product.init(
  {
    id: { type: DataTypes.UUID, defaultValue: uuid, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    category_id: { type: DataTypes.UUID, allowNull: false },
    price: { type: DataTypes.DECIMAL, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: true },
    imagen_url: { type: DataTypes.STRING(2048), allowNull: true },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true, // Si la BD lo maneja automáticamente, puedes ponerlo como true
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true, // Lo mismo aquí
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'products',
    timestamps: true,
  },
)

Product.belongsTo(Category, {
  foreignKey: 'category_id',
  targetKey: 'id',
  as: 'category', // Alias para la relación
})

Category.hasMany(Product, {
  foreignKey: 'category_id',
  sourceKey: 'id',
})

export default Product
