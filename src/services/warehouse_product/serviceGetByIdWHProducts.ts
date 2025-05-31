import WarehouseProduct from '@models/warehouseProduct'

export default async function getWarehouseProductById(id: string) {
  try {
    const record = await WarehouseProduct.findByPk(id)
    if (!record) {
      throw new Error('Registro en almacén no encontrado')
    }
    return record
  } catch (error) {
    throw new Error(
      `Error al obtener registro de almacén: ${error instanceof Error ? error.message : String(error)}`,
    )
  }
}
