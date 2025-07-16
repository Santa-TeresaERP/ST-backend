import warehouse from '@models/warehouse'

const serviceActivatewarehouse = async (id: string) => {
  const warehouses = await warehouse.findByPk(id)

  if (!warehouses) {
    return { error: 'El almacén no existe' }
  }

  if (warehouses.status === true) {
    return { error: 'El almacén ya está activo' }
  }

  // Cambiar el status a true para reactivar
  warehouses.status = true
  await warehouses.save()

  return { message: 'Almacén reactivado correctamente', warehouse: warehouses }
}

export default serviceActivatewarehouse
