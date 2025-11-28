import BuysProduct from '@models/buysProduct'
import ProductPurchased from '@models/productPurchased'
import Warehouse from '@models/warehouse'
import Supplier from '@models/suplier'

const serviceGetAllBuysProducts = async () => {
  const products = await BuysProduct.findAll({
    include: [
      {
        model: ProductPurchased,
        as: 'product_purchased',
        attributes: ['name', 'description', 'status'],
      },
      {
        model: Warehouse,
        as: 'warehouse',
        attributes: ['name'],
      },
      {
        model: Supplier,
        as: 'supplier',
        attributes: ['suplier_name'],
      },
    ],
    // GetAll: Todos los registros sin excepción (para desarrollador)
  })
  return products
}

export default serviceGetAllBuysProducts
