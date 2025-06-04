import Category from '@models/categories'
import Product from '@models/product'
import Recipe from '@models/recipe'
import Resource from '@models/resource'

const serviceGetAllProduct = async () => {
  const products = await Product.findAll({
    attributes: ['id', 'name', 'description', 'price', 'imagen_url'],
    include: [
      { model: Category, as: 'category' },
      {
        model: Recipe,
        include: [
          {
            model: Resource,
            as: 'resource',
            attributes: ['id', 'name', 'description', 'unit'],
          },
        ],
      },
    ],
  })
  return products
}

export default serviceGetAllProduct
