// src/models/productPurchased.ts

import { Model, DataTypes, Optional } from 'sequelize'
import sequelize from '@config/database'
import { v4 as uuid } from 'uuid'
import { ProductPurchasedAttributes } from '@type/almacen/product_purchased'

// Definimos los atributos que son opcionales en la creación
type ProductPurchasedCreationAttributes = Optional<
  ProductPurchasedAttributes,
  'id' | 'status' | 'createdAt' | 'updatedAt'
>

class ProductPurchased
  extends Model<ProductPurchasedAttributes, ProductPurchasedCreationAttributes>
  implements ProductPurchasedAttributes
{
  public id!: string
  public name!: string
  public description?: string | null
  public status!: boolean
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

ProductPurchased.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: uuid,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true, // Por defecto, todos los registros están activos
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'product_purchased', // Nombre de la tabla en la base de datos
  },
)

export default ProductPurchased
