import Return from '@models/returns'
import Product from '@models/product'
import Sale from '@models/sale'

const serviceGetReturns = async (storeId?: string) => {
  try {
    let findOptions = {}

    if (storeId) {
      // Si hay una tienda específica, filtramos las devoluciones por esa tienda
      findOptions = {
        include: [
          { model: Product, as: 'product' },
          {
            model: Sale,
            as: 'sale',
            where: { store_id: storeId },
            required: true,
          },
        ],
      }
    } else {
      // Si no, mostramos todas las devoluciones
      findOptions = {
        include: [
          { model: Product, as: 'product' },
          { model: Sale, as: 'sale' },
        ],
      }
    }

    const returns = await Return.findAll(findOptions)
    return returns
  } catch (error) {
    if (error instanceof Error) {
      return { error: 'Error al obtener devoluciones', details: error.message }
    }
    return { error: 'Error desconocido al obtener devoluciones' }
  }
}

export default serviceGetReturns
