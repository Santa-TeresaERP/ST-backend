import saleDetail from '@models/saleDetail'
import { SaleDetailAttributes } from '@type/ventas/saleDetail'
import { saleDetailValidation } from 'src/schemas/ventas/saleDetailSchema'

const serviceUpdateSaleDetail = async (
  id: string,
  body: Partial<SaleDetailAttributes>,
) => {
  const existing = await saleDetail.findByPk(id)
  if (!existing) {
    return { error: 'Detalle de venta no encontrado' }
  }

  const validation = saleDetailValidation({
    ...existing.toJSON(),
    ...body,
  } as SaleDetailAttributes)

  if (!validation.success) {
    return { error: validation.error.errors }
  }

  await existing.update(validation.data)
  return existing
}

export default serviceUpdateSaleDetail
