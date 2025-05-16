import WarehouseProduct from '@models/warehouseProduct'
import { WarehouseProductAttributes } from '@type/almacen/warehouse_product'

export default async function updateWarehouseProduct(
  warehouseProductId: string,
  data: Partial<WarehouseProductAttributes>,
) {
  try {
    const [affectedCount] = await WarehouseProduct.update(data, {
      where: { warehouse_product_id: warehouseProductId },
    })

    if (affectedCount === 0) {
      throw new Error('Registro en almacén no encontrado')
    }

    const updatedRecord = await WarehouseProduct.findByPk(warehouseProductId)
    return updatedRecord
  } catch (error) {
    throw new Error(
      `Error al actualizar registro en almacén: ${error instanceof Error ? error.message : String(error)}`,
    )
  }
}
