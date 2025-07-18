import { v4 as uuidv4 } from 'uuid'
import SalesChannel from '@models/sales_channel'
import { salesChannelValidation } from 'src/schemas/museo/sales_channel'
import { salesChannelAttributes } from '@type/museo/sales_channel'

const serviceCreateSalesChannel = async (body: salesChannelAttributes) => {
  const validation = salesChannelValidation(body)

  if (!validation.success) {
    return { error: validation.error.errors }
  }

  const name = validation.data.name
  const id = body.id || uuidv4()

  const newSalesChannel = await SalesChannel.create({
    id,
    name,
  }).catch((error) => {
    return {
      error: 'Error al registrar el canal de venta',
      details: error.message,
    }
  })

  return newSalesChannel
}

export default serviceCreateSalesChannel 