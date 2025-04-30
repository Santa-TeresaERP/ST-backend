import warehouse from '@models/warehouse'

const serviceDeletewarehouse = async (id: string) => {
  const warehouses = await warehouse.findByPk(id)

  if (!warehouses) {
    return { error: 'El almacén no existe' }
  }

  await warehouses.destroy()
  return { message: 'Almacén eliminado correctamente' }
}

export default serviceDeletewarehouse
