import BuysProduct from '@models/buysProduct'
import Product from '@models/product'
import Warehouse from '@models/warehouse'
import Supplier from '@models/suplier'

const serviceGetBuysProducts = async () => {
  const products = await BuysProduct.findAll({
    where: {
      status: true, // Get: Solo registros con status = true
    },
    include: [
      {
        model: Product,
        as: 'product',
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
