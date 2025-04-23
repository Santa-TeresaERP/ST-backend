import Product from '@models/product'
import Category from '@models/categories'
import { Identifier } from 'sequelize'

const serviceGetProductByID = async (id: Identifier | undefined) => {
  if (!id) {
    throw new Error('El ID del producto es requerido') // Lanza un error si el ID no es válido
  }
  const product = await Product.findByPk(id, { include: Category })
  if (!product) {
    throw new Error('Producto no encontrado') // Maneja el caso en que no se encuentre el producto
  }
  return product
}

export default serviceGetProductByID
