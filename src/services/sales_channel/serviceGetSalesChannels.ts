import SalesChannel from '@models/sales_channel'

const serviceGetSalesChannels = async () => {
  return await SalesChannel.findAll()
}

export default serviceGetSalesChannels 