import Return from '@models/returns'
import Product from '@models/product'
import Sale from '@models/sale'

const serviceGetReturns = async () => {
  const returns = await Return.findAll({
    include: [
      { model: Product, as: 'product' },
      { model: Sale, as: 'sale' },
    ],
  }).catch((error) => {
    return { error: 'Error al obtener devoluciones', details: error.message }
  })

  return returns
}

export default serviceGetReturns
