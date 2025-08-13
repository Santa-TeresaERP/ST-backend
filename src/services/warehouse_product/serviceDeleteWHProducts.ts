import WarehouseProduct from '@models/warehouseProduct'

export default async function deleteWarehouseProduct(id: string) {
  const product = await WarehouseProduct.findByPk(id)

  if (!product) {
    throw new Error('Producto no encontrado')
  }

  // Alternar estado
  product.status = !product.status
  await product.save()

  console.log(
    `Estado del producto con ID ${id} cambiado a ${product.status ? 'activo' : 'inactivo'}`,
  )

  return product
}
