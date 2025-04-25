import { productsValidation } from 'src/schemas/production/productsSchema'
import { ProductAttributes } from '@type/production/products'
import Product from '@models/product'

const serviceUpdateProduct = async (id: string, body: ProductAttributes) => {
  const validation = productsValidation(body)
  if (!validation.success) {
    return { error: validation.error.errors }
  }
  const product = await Product.findByPk(id)
  if (!product) {
    return { error: 'El producto no existe' }
  }
  const { name, category_id, price, description, imagen_url } = validation.data
  await product.update({
    name,
    category_id: category_id, // Mapea categoryId a category_id
    price: parseFloat(price.toString()), // Asegúrate de que el precio sea un float
    description,
    imagen_url, // Mapea imagenUrl a imagen_url
  })
  return product
}
export default serviceUpdateProduct
