import SalesChannel from '@models/sales_channel'

const serviceDeleteSalesChannel = async (id: string) => {
  const salesChannel = await SalesChannel.findByPk(id)
  if (!salesChannel) {
    return { error: 'Canal de venta no encontrado' }
  }
  await salesChannel.destroy()
  return { message: 'Canal de venta eliminado correctamente' }
}

export default serviceDeleteSalesChannel 