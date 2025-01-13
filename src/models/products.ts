import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@config/database'
import { ProductAttributes } from '@type/products'
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
  public stock!: number
  public description!: string
  public imagen_url!: string
}

Product.init(
  {
    id: { type: DataTypes.UUID, defaultValue: uuid, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    category_id: { type: DataTypes.UUID, allowNull: false },
    price: { type: DataTypes.DECIMAL, allowNull: false },
    stock: { type: DataTypes.INTEGER, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: true },
    imagen_url: { type: DataTypes.STRING, allowNull: true },
  },
  {
    sequelize,
    tableName: 'products',
    timestamps: true,
  },
)

// Relaciones
Product.belongsTo(Category, { foreignKey: 'category_id' })
Category.hasMany(Product, { foreignKey: 'category_id' })

export default Product
