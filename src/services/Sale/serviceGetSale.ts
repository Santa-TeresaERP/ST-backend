import sale from '@models/sale'
import Store from '@models/store'

const serviceGetSale = async (id: string) => {
  // Buscar una venta específica por su ID, incluyendo la relación con Store
  const saleRecord = await sale.findByPk(id, {
    include: [{ model: Store, as: 'store' }],
  })

  if (!saleRecord) {
    // Retornar un error si la venta no existe
    return { error: 'La venta no existe' }
  }

  return saleRecord
}

export default serviceGetSale
