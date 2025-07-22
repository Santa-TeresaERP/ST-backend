import sale from '@models/sale'
import Store from '@models/store'

const serviceGetSales = async (storeId?: string) => {
  // Si se proporciona un storeId, filtramos por esa tienda
  const whereClause = storeId ? { store_id: storeId } : {}

  // Obtener las ventas incluyendo la relación con Store
  const sales = await sale.findAll({
    where: whereClause,
    include: [{ model: Store, as: 'store' }],
  })
  return sales
}

export default serviceGetSales
