import saleDetail from '@models/saleDetail'
import Product from '@models/product'

const serviceGetSaleDetails = async () => {
  const details = await saleDetail.findAll({
    include: [
      {
        model: Product,
        as: 'product',
        attributes: ['name', 'price'],
      },
    ],
  })
  return details
}

export default serviceGetSaleDetails
