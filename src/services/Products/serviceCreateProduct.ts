import Product from '@models/product'
import Category from '@models/categories'
import { ProductAttributes } from '@type/production/products'
import { productsValidation } from 'src/schemas/production/productsSchema'

// Crear un producto
const serviceCreateProduct = async (body: ProductAttributes) => {
  const validation = productsValidation(body)

  if (!validation.success) {
    return { error: validation.error.errors }
  }

  const { name, category_id, price, description, imagen_url } = validation.data

  const categoryExists = await Category.findByPk(category_id)
  if (!categoryExists) {
    return { error: 'La categoría no existe' }
  }

  const newProduct = await Product.create({
    name,
    category_id: category_id,
    price,
    description: description ?? '',
    imagen_url: imagen_url ?? '',
  })
  return newProduct
}

export default serviceCreateProduct
