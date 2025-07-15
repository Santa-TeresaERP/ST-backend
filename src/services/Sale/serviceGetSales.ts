import sale from '@models/sale'
import Store from '@models/store'

const serviceGetSales = async () => {
  // Obtener todas las ventas incluyendo la relación con Store
  const sales = await sale.findAll({
    include: [{ model: Store, as: 'store' }],
  })
  return sales
}

export default serviceGetSales
