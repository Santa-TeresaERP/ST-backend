import sale from '@models/sale'

const serviceDeleteSale = async (id: string) => {
  // Buscar la venta por su ID
  const saleRecord = await sale.findByPk(id)

  if (!saleRecord) {
    // Retornar un error si la venta no existe
    return { error: 'La venta no existe' }
  }

  // Eliminar la venta
  await saleRecord.destroy()
  return { message: 'Venta eliminada correctamente' }
}

export default serviceDeleteSale
