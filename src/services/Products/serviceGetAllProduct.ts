import Category from '@models/categories'
import Product from '@models/product'
import RecipeProductConection from '@models/recipe_product_conections'
import RecipeProductResource from '@models/recipe_product_resource'
import Resource from '@models/resource'

const serviceGetAllProduct = async () => {
  const products = await Product.findAll({
    attributes: ['id', 'name', 'description', 'price', 'imagen_url'],
    include: [
      { model: Category, as: 'category' },
      {
        model: RecipeProductResource,
        include: [
          {
            model: RecipeProductConection,
            as: 'recipe_product_conections',
            include: [
              {
                model: Resource,
                as: 'resource',
              },
            ],
          },
        ],
      },
    ],
  })
  return products
}

export default serviceGetAllProduct
