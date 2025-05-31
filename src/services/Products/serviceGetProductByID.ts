import Product from '@models/product'
import Category from '@models/categories'
import RecipeProductResource from '@models/recipe_product_resource'
import RecipeProductConection from '@models/recipe_product_conections'
import Resource from '@models/resource'
const serviceGetProductByID = async (id: string) => {
  const product = await Product.findByPk(id, {
    attributes: ['id', 'name', 'description', 'price', 'imagen_url'],
    include: [
      {
        model: Category,
        as: 'category',
        attributes: ['id', 'name'],
      },
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

  if (!product) {
    return { error: 'El producto no existe' }
  }

  return product
}

export default serviceGetProductByID
