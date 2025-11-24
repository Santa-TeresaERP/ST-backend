import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '@config/database'
import { buysProductAttributes } from '@type/almacen/buys_product'
import Product from '@models/product'
import Warehouse from '@models/warehouse'
import Supplier from '@models/suplier'
import { v4 as uuidv4 } from 'uuid'
import ProductPurchased from './productPurchased'

class BuysProduct
  extends Model<buysProductAttributes, Optional<buysProductAttributes, 'id'>>
  implements buysProductAttributes
{
  static async findById(id: string): Promise<BuysProduct | null> {
    return await BuysProduct.findOne({ where: { id } })
  }
  public id?: string
  public warehouse_id!: string
  public product_id!: string
  public unit_price!: number
  public total_cost!: number
  public supplier_id!: string
  public quantity!: number
  public entry_date!: Date
  public status?: boolean
}

BuysProduct.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: uuidv4,
      primaryKey: true,
    },
    warehouse_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    unit_price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    total_cost: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    supplier_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    entry_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: 'buys_products',
    timestamps: true,
  },
)

// Relaciones
BuysProduct.belongsTo(Product, {
  foreignKey: 'product_id',
  as: 'product',
})
Product.hasMany(BuysProduct, {
  foreignKey: 'product_id',
  as: 'buys_products',
})

BuysProduct.belongsTo(Warehouse, {
  foreignKey: 'warehouse_id',
  as: 'warehouse',
})
Warehouse.hasMany(BuysProduct, {
  foreignKey: 'warehouse_id',
  as: 'buys_products',
})

BuysProduct.belongsTo(Supplier, {
  foreignKey: 'supplier_id',
  as: 'supplier',
})
Supplier.hasMany(BuysProduct, {
  foreignKey: 'supplier_id',
  as: 'buys_products',
})

BuysProduct.hasMany(ProductPurchased, {
  foreignKey: 'buysproduct_id',
  as: 'product_purchased',
})
ProductPurchased.belongsTo(BuysProduct, {
  foreignKey: 'productPurchased_id',
  as: 'buys_products',
})

export default BuysProduct
