import SalesChannel from '@models/sales_channel'
import { salesChannelValidation } from 'src/schemas/museo/sales_channel'
import { salesChannelAttributes } from '@type/museo/sales_channel'

const serviceUpdateSalesChannel = async (
  id: string,
  body: salesChannelAttributes,
) => {
  const validation = salesChannelValidation(body)
  if (!validation.success) {
    return { error: validation.error.errors }
  }
  const salesChannel = await SalesChannel.findByPk(id)
  if (!salesChannel) {
    return { error: 'Canal de venta no encontrado' }
  }
  await salesChannel.update({
    name: validation.data.name,
  })
  return salesChannel
}

export default serviceUpdateSalesChannel
