import Product from '@models/products'
import Category from '@models/categories'
import { ProductAttributes } from '@type/products'
import { productsValidation } from 'src/schemas/productsSchema'

class useProducts {
  // Crear un producto
  static async createProduct(body: ProductAttributes) {
    const validation = productsValidation(body)

    if (!validation.success) {
      return { error: validation.error.errors }
    }

    const { name, category_id, price, stock, description, imagen_url } =
      validation.data

    const categoryExists = await Category.findByPk(category_id)
    if (!categoryExists) {
      return { error: 'La categoría no existe' }
    }

    const newProduct = await Product.create({
      name,
      category_id: category_id,
      price,
      stock,
      description: description ?? '',
      imagen_url: imagen_url ?? '',
    })
    return newProduct
  }

  // Obtener todos los productos
  static async getProducts() {
    const products = await Product.findAll()
    return products
  }

  // Actualizar un producto
  static async updateProduct(id: string, body: ProductAttributes) {
    const validation = productsValidation(body)

    if (!validation.success) {
      return { error: validation.error.errors }
    }

    const product = await Product.findByPk(id)
    if (!product) {
      return { error: 'El producto no existe' }
    }

    const { name, category_id, price, stock, description, imagen_url } =
      validation.data

    await product.update({
      name,
      category_id: category_id, // Mapea categoryId a category_id
      price: parseFloat(price.toString()), // Asegúrate de que el precio sea un float
      stock,
      description,
      imagen_url, // Mapea imagenUrl a imagen_url
    })
    return product
  }

  // Eliminar un producto
  static async deleteProduct(id: string) {
    const product = await Product.findByPk(id)

    if (!product) {
      return { error: 'El producto no existe' }
    }

    await product.destroy()
    return { message: 'Producto eliminado correctamente' }
  }
}

export default useProducts
