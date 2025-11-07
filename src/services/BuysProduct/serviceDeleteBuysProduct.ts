import BuysProduct from '@models/buysProduct'

const serviceDeleteBuysProduct = async (id: string) => {
  const buysProduct = await BuysProduct.findByPk(id)

  if (!buysProduct) {
    return { error: 'La compra de producto no existe' }
  }

  // Delete: Cambiar status de true a false
  buysProduct.status = false
  await buysProduct.save()

  console.log(
    `Estado de la compra de producto con ID ${id} cambiado a inactivo (false)`,
  )

  return buysProduct
}

export default serviceDeleteBuysProduct
