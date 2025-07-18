import SalesChannel from '@models/sales_channel'

const serviceGetSalesChannel = async (id: string) => {
  const salesChannel = await SalesChannel.findByPk(id)
  if (!salesChannel) {
    return { error: 'Canal de venta no encontrado' }
  }
  return salesChannel
}

export default serviceGetSalesChannel 