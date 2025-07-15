import WarehouseProduct from '@models/warehouseProduct'
import Product from '@models/product'
import Warehouse from '@models/warehouse'
import { WarehouseProductAttributes } from '@type/almacen/warehouse_product.d'

export default async function createWarehouseProduct(
  data: Omit<WarehouseProductAttributes, 'createdAt' | 'updatedAt'>,
) {
  try {
    const product = await Product.findByPk(data.product_id)
    if (!product) {
      throw new Error('Producto no encontrado')
    }

    const warehouse = await Warehouse.findByPk(data.warehouse_id)
    if (!warehouse) {
      throw new Error('Almacén no encontrado')
    }

    // Buscar si ya existe ese producto en ese almacén
    const existingRecord = await WarehouseProduct.findOne({
      where: {
        product_id: data.product_id,
        warehouse_id: data.warehouse_id,
      },
    })

    if (existingRecord) {
      // Si ya existe, actualizar cantidad y entry_date
      existingRecord.quantity += data.quantity
      existingRecord.entry_date = data.entry_date || new Date()
      await existingRecord.save()
      return existingRecord
    }

    // Si no existe, crear nuevo registro
    const newRecord = await WarehouseProduct.create({
      ...data,
      entry_date: data.entry_date || new Date(),
    })

    return newRecord
  } catch (error) {
    throw new Error(
      `Error al crear o actualizar producto en almacén: ${error instanceof Error ? error.message : String(error)}`,
    )
  }
}
