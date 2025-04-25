import Product from '@models/product'

const serviceDeleteProduct = async (id: string) => {
  const product = await Product.findByPk(id)

  if (!product) {
    return { error: 'El producto no existe' }
  }

  await product.destroy()
  return { message: 'Producto eliminado correctamente' }
}
export default serviceDeleteProduct
