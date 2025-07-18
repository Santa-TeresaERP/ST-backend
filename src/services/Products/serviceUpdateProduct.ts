import { ProductAttributes } from '@type/production/products'
import { productsValidation } from 'src/schemas/production/productsSchema'
import Product from '@models/product'

const serviceUpdateProduct = async (
  id: string,
  body: ProductAttributes,
  file?: Express.Multer.File,
) => {
  // pilla price como string o número y lo convierte
  const priceNum =
    typeof body.price === 'string' ? parseFloat(body.price) : body.price

  const imagen_url = file
    ? `${process.env.HOST_URL || 'http://localhost:3005'}/uploads/products/${file.filename}`
    : body.imagen_url || ''

  // usa priceNum en lugar de body.price
  const validation = productsValidation({
    ...body,
    price: priceNum,
    imagen_url,
  })

  if (!validation.success) {
    return { error: validation.error.errors }
  }

  const product = await Product.findByPk(id)
  if (!product) {
    return { error: 'El producto no existe' }
  }

  const { name, category_id, price, description } = validation.data

  await product.update({
    name,
    category_id,
    price: parseFloat(price.toString()),
    description,
    imagen_url,
  })

  return product
}

export default serviceUpdateProduct
