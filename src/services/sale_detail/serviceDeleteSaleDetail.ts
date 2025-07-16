import saleDetail from '@models/saleDetail'

const serviceDeleteSaleDetail = async (id: string) => {
  const existing = await saleDetail.findByPk(id)
  if (!existing) {
    return { error: 'Detalle de venta no encontrado' }
  }

  await existing.destroy()
  return { message: 'Detalle de venta eliminado correctamente' }
}

export default serviceDeleteSaleDetail
