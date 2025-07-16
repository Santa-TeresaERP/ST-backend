import saleDetail from '@models/saleDetail'

const serviceGetSaleDetail = async (id: string) => {
  const detail = await saleDetail.findByPk(id)
  if (!detail) {
    return { error: 'Detalle de venta no encontrado' }
  }
  return detail
}

export default serviceGetSaleDetail
