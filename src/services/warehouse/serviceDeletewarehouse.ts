import warehouse from '@models/warehouse'

const serviceDeletewarehouse = async (id: string, status: boolean) => {
  const warehouses = await warehouse.findByPk(id)

  if (!warehouses) {
    return { error: 'El almacén no existe' }
  }

  // Cambiar el status a false en lugar de eliminar
  warehouses.status = status // Alternar el estado
  await warehouses.save()

  console.log(`Estado del almacén "${warehouses.name}" cambiado a: ${warehouses.status ? 'activo' : 'inactivo'}`)

  return { message: 'Almacén desactivado correctamente' }
}

export default serviceDeletewarehouse
