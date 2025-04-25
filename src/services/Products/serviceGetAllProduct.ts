import Product from '@models/product'

const serviceGetAllProduct = async () => {
  const products = await Product.findAll()
  return products
}

export default serviceGetAllProduct
