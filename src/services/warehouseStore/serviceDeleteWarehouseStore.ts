import WarehouseStore from '@models/warehouseStore'

const serviceDeleteWarehouseStore = async (id: string) => {
  // Buscar el registro por su ID
  const warehouseStore = await WarehouseStore.findByPk(id)

  if (!warehouseStore) {
    // Retornar un error si el registro no existe
    return { error: 'El registro no existe en el almacén' }
  }

  // Eliminar el registro
  await warehouseStore.destroy()
  return { message: 'Registro eliminado correctamente del almacén' }
}

export default serviceDeleteWarehouseStore
