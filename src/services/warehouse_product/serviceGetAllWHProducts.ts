import WarehouseProduct from '@models/warehouseProduct'

export default async function getAllWarehouseProducts() {
  try {
    const records = await WarehouseProduct.findAll({
      order: [['entry_date', 'DESC']],
    })
    return records
  } catch (error) {
    throw new Error(
      `Error al obtener registros de almacén: ${error instanceof Error ? error.message : String(error)}`,
    )
  }
}
