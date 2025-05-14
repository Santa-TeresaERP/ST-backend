import WarehouseProduct from '@models/warehouseProduct'
import Warehouse from '@models/warehouse'

export default async function getWarehouseProductsByWarehouse(
  warehouseId: string,
) {
  try {
    const warehouse = await Warehouse.findByPk(warehouseId)
    if (!warehouse) {
      throw new Error('Almacén no encontrado')
    }

    const records = await WarehouseProduct.findAll({
      where: { warehouse_id: warehouseId },
      order: [['entry_date', 'DESC']],
    })
    return records
  } catch (error) {
    throw new Error(
      `Error al obtener productos por almacén: ${error instanceof Error ? error.message : String(error)}`,
    )
  }
}
