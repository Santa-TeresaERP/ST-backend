import WarehouseProduct from '@models/warehouseProduct'

export default async function deleteWarehouseProduct(id: string) {
  try {
    const deletedCount = await WarehouseProduct.destroy({
      where: { id },
    })

    if (deletedCount === 0) {
      throw new Error('Registro en almacén no encontrado')
    }

    return deletedCount
  } catch (error) {
    throw new Error(
      `Error al eliminar registro de almacén: ${error instanceof Error ? error.message : String(error)}`,
    )
  }
}
