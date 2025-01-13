import Sale from './sales'
import SaleItem from './salesItems'
import User from './user'
import Product from './products'

// Definir relaciones
Sale.hasMany(SaleItem, { foreignKey: 'salesId' })
SaleItem.belongsTo(Sale, { foreignKey: 'salesId' })
SaleItem.belongsTo(Product, { foreignKey: 'productId' })
Product.hasMany(SaleItem, { foreignKey: 'productId' })

export { Sale, SaleItem, User, Product }
