import warehouse from '@models/warehouse'

const serviceDeletewarehouse = async (id: string) => {
  const warehouses = await warehouse.findByPk(id)

  if (!warehouses) {
    return { error: 'El almacén no existe' }
  }

  // Cambiar el status a false en lugar de eliminar
  warehouses.status = false
  await warehouses.save()

  return { message: 'Almacén desactivado correctamente' }
}

export default serviceDeletewarehouse
