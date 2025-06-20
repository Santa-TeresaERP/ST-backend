import Category from '@models/categories'
import Product from '@models/product'
import Recipe from '@models/recipe'

const serviceGetAllProduct = async () => {
  const products = await Product.findAll({
    attributes: ['id', 'name', 'description', 'price', 'imagen_url'],
    include: [
      { model: Category, as: 'category' },
      {
        model: Recipe,
        as: 'recipe',
      },
    ],
  })
  return products
}

export default serviceGetAllProduct
