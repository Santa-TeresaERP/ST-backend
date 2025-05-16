import WarehouseProduct from '@models/warehouseProduct'
import Product from '@models/product'

export default async function getWarehouseProductsByProduct(productId: string) {
  try {
    const product = await Product.findByPk(productId)
    if (!product) {
      throw new Error('Producto no encontrado')
    }

    const records = await WarehouseProduct.findAll({
      where: { product_id: productId },
      order: [['entry_date', 'DESC']],
    })
    return records
  } catch (error) {
    throw new Error(
      `Error al obtener almacenes por producto: ${error instanceof Error ? error.message : String(error)}`,
    )
  }
}
