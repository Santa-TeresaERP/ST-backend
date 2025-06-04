import Product from '@models/product'
import Category from '@models/categories'
import Recipe from '@models/recipe'
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

  if (!product) {
    return { error: 'El producto no existe' }
  }

  return product
}

export default serviceGetProductByID
