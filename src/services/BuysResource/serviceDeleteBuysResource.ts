import BuysResource from '@models/buysResource'

const serviceDeleteBuysResource = async (id: string) => {
  const buysResource = await BuysResource.findByPk(id)

  if (!buysResource) {
    return { error: 'El recurso de compra no existe' }
  }

  // Alternar estado
  buysResource.status = !buysResource.status
  await buysResource.save()

  console.log(`Estado del recurso de compra con ID ${id} cambiado a ${buysResource.status ? 'activo' : 'inactivo'}`)
  
  return buysResource
}

export default serviceDeleteBuysResource
