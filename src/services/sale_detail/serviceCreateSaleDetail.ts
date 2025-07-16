import saleDetail from '@models/saleDetail'
import { SaleDetailAttributes } from '@type/ventas/saleDetail'
import { saleDetailValidation } from 'src/schemas/ventas/saleDetailSchema'

const serviceCreateSaleDetail = async (body: SaleDetailAttributes) => {
  const validation = saleDetailValidation(body)

  if (!validation.success) {
    return { error: validation.error.errors }
  }

  const { saleId, productId, quantity, mount } = validation.data

  const newSaleDetail = await saleDetail.create({
    saleId,
    productId,
    quantity,
    mount,
  })

  return newSaleDetail
}

export default serviceCreateSaleDetail
