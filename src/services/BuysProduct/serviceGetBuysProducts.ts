import BuysProduct from '@models/buysProduct'
import ProductPurchased from '@models/productPurchased'
import Warehouse from '@models/warehouse'
import Supplier from '@models/suplier'

const serviceGetBuysProducts = async () => {
  const products = await BuysProduct.findAll({
    where: {
      status: true, // Get: Solo registros con status = true
    },
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
  })
  return products
}

export default serviceGetBuysProducts
